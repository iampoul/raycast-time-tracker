import { Detail } from "@raycast/api"
import React from "react"
import { Timer } from "../utils/timerUtils"

interface TimerRadarChartProps {
    timers: Timer[]
}

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
}

export function TimerChart({ timers }: TimerRadarChartProps) {
    const totalTime = timers.reduce((sum, timer) => sum + timer.totalSeconds, 0)

    const data = timers.map((timer) => ({
        name: timer.name,
        time: formatTime(timer.totalSeconds),
        percentage: ((timer.totalSeconds / totalTime) * 100).toFixed(2),
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
