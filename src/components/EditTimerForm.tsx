import { Action, ActionPanel, Color, Form, useNavigation } from "@raycast/api"
import React, { useState } from "react"
import { Timer } from "../utils/timerUtils"

interface EditTimerFormProps {
    timer: Timer
    onUpdate: (timer: Timer) => void
}

export function EditTimerForm({ timer, onUpdate }: EditTimerFormProps) {
    const [name, setName] = useState(timer.name)
    const [color, setColor] = useState<Color>(timer.color)
    const { pop } = useNavigation()

    const handleSubmit = () => {
        const updatedTimer: Timer = {
            ...timer,
            name,
            color,
            // Preserve the running state and startTime
            isRunning: timer.isRunning,
            startTime: timer.startTime,
        }
        onUpdate(updatedTimer)
        pop()
    }

    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm title="Save" onSubmit={handleSubmit} />
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
