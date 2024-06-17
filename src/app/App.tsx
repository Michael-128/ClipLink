import React, { useEffect, useState } from "react";
import CPicker from "./CPicker";
import ServerView from "./ServerView";
import ClientView from "./ClientView";
import CClipboardArea from "./CClipboardArea";
import AppMode from "../types/AppMode";
import { getAppMode, saveAppMode } from "../storage";
import Theme from "../types/Themes";

function App() {
    let isMonitoring = false
    const [selection, _setSelection] = useState<AppMode>(getAppMode())

    function setSelection(selection: AppMode) {
        _setSelection(selection)
        saveAppMode(selection)
    }

    async function getTheme() {
        const theme = await window.api.invoke("getTheme")
        setTheme(theme)
    }

    function setTheme(theme: Theme) {
        if(theme === Theme.LIGHT) document.body.classList.remove("dark")
        else document.body.classList.add("dark")
    }

    function monitorTheme() {
        if(isMonitoring) return
        window.api.on("theme-updated", (event, ...args) => { setTheme(args[0]) })
        isMonitoring = true
    }

    useEffect(() => {
        monitorTheme(); getTheme() 
    }, [])

    return (
        <div className="p-4 h-screen flex flex-col box-border">
            <div className="bg-slate-100 dark:bg-stone-900 rounded p-4 w-full mb-4">
                <CPicker selection={selection} setSelection={setSelection}/>

                { selection == AppMode.SERVER && <ServerView/> }
                { selection == AppMode.CLIENT && <ClientView/> }
            </div>

            <CClipboardArea/>
        </div>
    )
}

export default App