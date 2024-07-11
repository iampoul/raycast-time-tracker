import { Action, ActionPanel, Color, Grid, Icon } from "@raycast/api"
import React, { useEffect, useState } from "react"
import { Timer, formatTime } from "../utils/timerUtils"
import { EditTimerForm } from "./EditTimerForm"
import { TimerLogView } from "./TimerLogView"

interface TimerTileProps {
    timer: Timer
    onUpdate: (timer: Timer) => void
    onDelete: (id: string) => void
}

export function TimerTile({ timer, onUpdate, onDelete }: TimerTileProps) {
    const [elapsedTime, setElapsedTime] = useState(timer.totalSeconds)

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (timer.isRunning) {
            const startTime = timer.startTime || Date.now()
            interval = setInterval(() => {
                const now = Date.now()
                setElapsedTime(timer.totalSeconds + Math.floor((now - startTime) / 1000))
            }, 1000)
        } else {
            setElapsedTime(timer.totalSeconds)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [timer.isRunning, timer.totalSeconds, timer.startTime])

    const toggleTimer = () => {
        const currentTime = Date.now()
        const updatedTimer: Timer = {
            ...timer,
            isRunning: !timer.isRunning,
            totalSeconds:
                timer.isRunning && timer.startTime
                    ? timer.totalSeconds + Math.floor((currentTime - timer.startTime) / 1000)
                    : timer.totalSeconds,
            startTime: !timer.isRunning ? currentTime : undefined,
        }
        onUpdate(updatedTimer)
    }

    return (
        <Grid.Item
            content={{
                source: timer.isRunning ? Icon.Play : Icon.Stop,
                tintColor: timer.color as Color,
            }}
            title={timer.name}
            subtitle={`Total: ${formatTime(elapsedTime)}`}
            actions={
                <ActionPanel>
                    <Action
                        title={timer.isRunning ? "Stop" : "Start"}
                        icon={timer.isRunning ? Icon.Stop : Icon.Play}
                        onAction={toggleTimer}
                    />
                    <Action.Push title="Edit" target={<EditTimerForm timer={timer} onUpdate={onUpdate} />} />
                    <Action.Push title="View Log" target={<TimerLogView timer={timer} />} />
                    <Action title="Delete" onAction={() => onDelete(timer.id)} />
                </ActionPanel>
            }
        />
    )
}
