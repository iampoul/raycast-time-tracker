// startTimer.tsx
import { Action, ActionPanel, List, Toast, showToast } from "@raycast/api"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { getTrackers, saveTrackers } from "./store"
import { TimeEntry, Tracker } from "./types"

interface StartTimerProps {
    tracker?: Tracker
}

export default function Command({ tracker }: StartTimerProps) {
    const [trackers, setTrackers] = useState<Tracker[]>([])

    useEffect(() => {
        if (tracker) {
            setTrackers([tracker])
        } else {
            getTrackers().then(setTrackers)
        }
    }, [tracker])

    async function handleStartTimer(selectedTracker: Tracker) {
        const newEntry: TimeEntry = {
            id: uuidv4(),
            startTime: new Date(),
            endTime: null,
            duration: 0,
        }

        const updatedTrackers = trackers.map((t) =>
            t.id === selectedTracker.id ? { ...t, logs: [...t.logs, newEntry] } : t,
        )

        await saveTrackers(updatedTrackers)
        showToast(Toast.Style.Success, `Timer started for ${selectedTracker.title}`)
    }

    return (
        <List>
            {trackers.map((t) => (
                <List.Item
                    key={t.id}
                    title={t.title}
                    actions={
                        <ActionPanel>
                            <Action title="Start Timer" onAction={() => handleStartTimer(t)} />
                        </ActionPanel>
                    }
                />
            ))}
        </List>
    )
}
