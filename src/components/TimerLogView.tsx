import { List } from "@raycast/api"
import React from "react"
import { Timer } from "../utils/timerUtils"

interface TimerLogViewProps {
    timer: Timer
}

export function TimerLogView({ timer }: TimerLogViewProps) {
    return (
        <List>
            {timer.logs.map((log, index) => (
                <List.Item
                    key={index}
                    title={`${log.startTime} - ${log.endTime}`}
                    subtitle={`Duration: ${log.duration}`}
                />
            ))}
        </List>
    )
}
