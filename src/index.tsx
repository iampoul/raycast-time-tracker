import { Action, ActionPanel, Color, Grid, Icon, Toast, showToast } from "@raycast/api"
import { useEffect, useState } from "react"
import { AddNewTimerForm } from "./components/AddNewTimerForm"
import { TimerTile } from "./components/TimerTile"
import { getStoredTimers, storeTimers } from "./utils/storage"
import { Timer } from "./utils/timerUtils"

export default function Command() {
    const [timers, setTimers] = useState<Timer[]>([])

    useEffect(() => {
        const loadTimers = async () => {
            const storedTimers = await getStoredTimers()
            setTimers(storedTimers)
        }
        loadTimers()
    }, [])

    const updateTimer = async (updatedTimer: Timer) => {
        const currentTime = Date.now()

        const newTimers = timers.map((timer) => {
            if (timer.id === updatedTimer.id) {
                // If this is the timer being updated
                if (timer.isRunning) {
                    // If it was running, update its totalSeconds
                    const elapsedSeconds = timer.startTime ? Math.floor((currentTime - timer.startTime) / 1000) : 0
                    return {
                        ...updatedTimer,
                        totalSeconds: timer.totalSeconds + elapsedSeconds,
                        startTime: updatedTimer.isRunning ? currentTime : undefined,
                    }
                }
                return updatedTimer
            } else if (updatedTimer.isRunning && timer.isRunning) {
                // If we're starting a new timer and this one was running
                const elapsedSeconds = timer.startTime ? Math.floor((currentTime - timer.startTime) / 1000) : 0
                return {
                    ...timer,
                    isRunning: false,
                    totalSeconds: timer.totalSeconds + elapsedSeconds,
                    logs: [
                        ...timer.logs,
                        {
                            startTime: timer.startTime
                                ? new Date(timer.startTime).toISOString()
                                : new Date(currentTime).toISOString(),
                            endTime: new Date(currentTime).toISOString(),
                            duration: elapsedSeconds,
                        },
                    ],
                    startTime: undefined,
                }
            }
            return timer
        })

        setTimers(newTimers)
        await storeTimers(newTimers)
    }

    const deleteTimer = async (id: string) => {
        const newTimers = timers.filter((timer) => timer.id !== id)
        setTimers(newTimers)
        await storeTimers(newTimers)
    }

    const addNewTimer = async (newTimer: Timer) => {
        const updatedTimers = [...timers, newTimer]
        setTimers(updatedTimers)
        await storeTimers(updatedTimers)
        await showToast({
            style: Toast.Style.Success,
            title: "Timer Added",
            message: `${newTimer.name} has been added to your timers.`,
        })
    }

    return (
        <Grid columns={3}>
            {timers.map((timer) => (
                <TimerTile key={timer.id} timer={timer} onUpdate={updateTimer} onDelete={deleteTimer} />
            ))}
            <Grid.Item
                content={{
                    source: Icon.Plus,
                    tintColor: Color.Blue,
                }}
                title="Add New Timer"
                actions={
                    <ActionPanel>
                        <Action.Push title="Add New Timer" target={<AddNewTimerForm onAdd={addNewTimer} />} />
                    </ActionPanel>
                }
            />
        </Grid>
    )
}
