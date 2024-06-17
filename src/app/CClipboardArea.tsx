import React, { useEffect, useState } from "react";

function CClipboardArea() {

    const [log, setLog] = useState<string[]>([])
    let isMonitoring = false

    function monitorLog() {
        window.api.on("log", (event, ...args) => {
            setLog(prevLog => [...prevLog, args[0]])
        })
    }

    useEffect(() => {
        if(!isMonitoring) { monitorLog(); isMonitoring = true  }
    }, [])

    return (
        <div className="bg-slate-100 p-4 w-full outline-none grow rounded flex flex-col">
            <h2 className="text-2xl font-bold">Log</h2>
            <textarea disabled className="bg-slate-100 w-full grow outline-none" value={log.join('\n')}></textarea>
        </div>
    )
}

export default CClipboardArea