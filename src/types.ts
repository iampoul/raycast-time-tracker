export interface Tracker {
  id: string;
  title: string;
  totalTime: number;
  logs: TimeEntry[];
}

export interface TimeEntry {
  id: string;
  startTime: Date;
  endTime: Date | null;
  duration: number;
}
