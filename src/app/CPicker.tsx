import React from "react";
import AppMode from "../types/AppMode";

interface IPicker {
    selection: string
    setSelection: (value: AppMode) => void
}

function CPicker({ selection, setSelection }: IPicker) {

    return (
        <div className="mb-6 text-center">
            <label className="mr-4">
                <input
                    type="radio"
                    value="server"
                    checked={selection === AppMode.SERVER}
                    onChange={() => setSelection(AppMode.SERVER)}
                    className="mr-2"
                />
                Server
            </label>
            <label>
                <input
                    type="radio"
                    value="client"
                    checked={selection === AppMode.CLIENT}
                    onChange={() => setSelection(AppMode.CLIENT)}
                    className="mr-2"
                />
                Client
            </label>
        </div>
    )
}

export default CPicker