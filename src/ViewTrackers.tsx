import { Action, ActionPanel, List } from "@raycast/api"
import { useEffect, useState } from "react"
import StartTimer from "./StartTimer"
import TrackerDetails from "./TrackerDetails"
import formatTime from "./formatTime"
import { getTrackers } from "./store"
import { Tracker } from "./types"

const ViewTrackers = () => {
    const [trackers, setTrackers] = useState<Tracker[]>([])

    useEffect(() => {
        getTrackers().then(setTrackers)
    }, [])

    return (
        <List>
            {trackers.map((tracker) => (
                <List.Item
                    key={tracker.id}
                    title={tracker.title}
                    subtitle={`Total time: ${formatTime(tracker.totalTime)}`}
                    actions={
                        <ActionPanel>
                            <Action.Push title="Start Timer" target={<StartTimer tracker={tracker} />} />
                            <Action.Push title="View Details" target={<TrackerDetails tracker={tracker} />} />
                        </ActionPanel>
                    }
                />
            ))}
        </List>
    )
}

export default ViewTrackers
