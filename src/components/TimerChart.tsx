import { Detail } from "@raycast/api"
import React from "react"
import { Timer } from "../utils/timerUtils"

interface TimerChartProps {
    timers: Timer[]
}

function formatTime(seconds: number): string {
    if (seconds < 60) {
        return `${seconds}s`
    }
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours === 0) {
        return `${minutes}m`
    }
    return `${hours}h ${minutes}m`
}

export function TimerChart({ timers }: TimerChartProps) {
    const totalTime = timers.reduce((sum, timer) => sum + timer.totalSeconds, 0)

    const data = timers.map((timer) => ({
        name: timer.name,
        time: formatTime(timer.totalSeconds),
        percentage: totalTime > 0 ? ((timer.totalSeconds / totalTime) * 100).toFixed(2) : "0.00",
    }))

    const markdownTable = `
## Time Distribution

| Timer | Time | Percentage |
|-------|------|------------|
${data.map((row) => `| ${row.name} | ${row.time} | ${row.percentage}% |`).join("\n")}

Total time: ${formatTime(totalTime)}
  `

    return <Detail markdown={markdownTable} />
}
