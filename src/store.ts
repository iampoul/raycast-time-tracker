import { LocalStorage } from "@raycast/api";
import {Tracker} from "./types";

export async function getTrackers(): Promise<Tracker[]> {
  const trackers = await LocalStorage.getItem<string>("trackers");
  return trackers ? JSON.parse(trackers) : [];
}

export async function saveTrackers(trackers: Tracker[]): Promise<void> {
  await LocalStorage.setItem("trackers", JSON.stringify(trackers));
}
