import { Color } from "@raycast/api"

export interface Timer {
    id: string
    name: string
    color: Color
    totalSeconds: number
    isRunning: boolean
    logs: TimerLog[]
    startTime?: number
}

export interface TimerLog {
    startTime: string
    endTime: string
    duration: number
}

export function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}
