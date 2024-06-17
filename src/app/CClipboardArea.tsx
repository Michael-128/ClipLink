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
        <div className="bg-slate-100 dark:bg-stone-900 p-4 w-full outline-none grow rounded flex flex-col">
            <h2 className="text-2xl font-bold py-1">Log</h2>
            <textarea disabled className="bg-white dark:bg-stone-950 rounded p-1 text-sm font-mono w-full grow outline-none resize-none" value={log.join('\n')}></textarea>
        </div>
    )
}

export default CClipboardArea