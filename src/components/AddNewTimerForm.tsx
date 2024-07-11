import { Action, ActionPanel, Color, Form, useNavigation } from "@raycast/api"
import React, { useState } from "react"
import { Timer } from "../utils/timerUtils"

interface AddNewTimerFormProps {
    onAdd: (timer: Timer) => void
}

export function AddNewTimerForm({ onAdd }: AddNewTimerFormProps) {
    const [name, setName] = useState("")
    const [color, setColor] = useState<Color>(Color.Red)
    const { pop } = useNavigation()

    const handleSubmit = () => {
        const newTimer: Timer = {
            id: Date.now().toString(),
            name,
            color,
            totalSeconds: 0,
            isRunning: false,
            logs: [],
        }
        onAdd(newTimer)
        pop()
    }

    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm title="Add Timer" onSubmit={handleSubmit} />
                </ActionPanel>
            }
        >
            <Form.TextField id="name" title="Name" value={name} onChange={setName} />
            <Form.Dropdown id="color" title="Color" value={color} onChange={(newValue) => setColor(newValue as Color)}>
                <Form.Dropdown.Item value={Color.Red} title="Red" />
                <Form.Dropdown.Item value={Color.Green} title="Green" />
                <Form.Dropdown.Item value={Color.Blue} title="Blue" />
                <Form.Dropdown.Item value={Color.Yellow} title="Yellow" />
                <Form.Dropdown.Item value={Color.Purple} title="Purple" />
                <Form.Dropdown.Item value={Color.Orange} title="Orange" />
            </Form.Dropdown>
        </Form>
    )
}
