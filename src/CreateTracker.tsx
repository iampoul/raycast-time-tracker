import { Action, ActionPanel, Form, Toast, showToast } from "@raycast/api"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { getTrackers, saveTrackers } from "./store"
import { Tracker } from "./types"

export default function Command() {
    const [title, setTitle] = useState("")

    async function handleSubmit() {
        const newTracker: Tracker = {
            id: uuidv4(),
            title,
            totalTime: 0,
            logs: [],
        }

        const trackers = await getTrackers()
        await saveTrackers([...trackers, newTracker])

        showToast(Toast.Style.Success, "Tracker created successfully")
    }

    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm title="Create Tracker" onSubmit={handleSubmit} />
                </ActionPanel>
            }
        >
            <Form.TextField id="title" title="Tracker Title" value={title} onChange={setTitle} />
        </Form>
    )
}
