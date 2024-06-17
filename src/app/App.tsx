import React, { FormEvent, useState } from "react";
import CPicker from "./CPicker";
import ServerView from "./ServerView";
import ClientView from "./ClientView";
import CClipboardArea from "./CClipboardArea";

function App() {
    const [selection, setSelection] = useState('client')


    return (
        <div className="p-4 h-screen flex flex-col box-border">
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 w-full mb-4">
                <CPicker selection={selection} setSelection={setSelection}/>

                { selection == 'server' && <ServerView/> }
                { selection == 'client' && <ClientView/> }
            </div>

            <CClipboardArea/>
        </div>
    )
}

export default App