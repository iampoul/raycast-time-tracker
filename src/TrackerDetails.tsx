import { Action, ActionPanel, Detail } from "@raycast/api"
import formatTime from "../lib/formatTime"
import { Tracker } from "../types"
import StartTimer from "./StartTimer"

const TrackerDetails = ({ tracker }: { tracker: Tracker }) => {
    const markdown = `
# ${tracker.title}

Total time tracked: ${formatTime(tracker.totalTime)}

## Logs

${tracker.logs
    .map(
        (log) => `
- Start: ${log.startTime.toLocaleString()}
  End: ${log.endTime ? log.endTime.toLocaleString() : "Ongoing"}
  Duration: ${formatTime(log.duration)}
`,
    )
    .join("\n")}
  `

    return (
        <Detail
            markdown={markdown}
            actions={
                <ActionPanel>
                    <Action.Push title="Start New Timer" target={<StartTimer tracker={tracker} />} />
                </ActionPanel>
            }
        />
    )
}

export default TrackerDetails
