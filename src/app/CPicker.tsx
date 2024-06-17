import React from "react";

interface IPicker {
    selection: string
    setSelection: (value: string) => void
}

function CPicker({ selection, setSelection }: IPicker) {

    return (
        <div className="mb-6 text-center">
            <label className="mr-4">
                <input
                    type="radio"
                    value="server"
                    checked={selection === "server"}
                    onChange={() => setSelection("server")}
                    className="mr-2"
                />
                Server
            </label>
            <label>
                <input
                    type="radio"
                    value="client"
                    checked={selection === "client"}
                    onChange={() => setSelection("client")}
                    className="mr-2"
                />
                Client
            </label>
        </div>
    )
}

export default CPicker