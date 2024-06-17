import React, { useEffect, useState } from "react";
import componentStyles from "../components";
import ServerStatus from "../types/ServerStatus";

function ServerView() {
    const [ip, setIP] = useState("127.0.0.1")
    const [port, setPort] = useState(21888)
    const [serverStatus, setServerStatus] = useState<ServerStatus>(ServerStatus.CLOSE)

    async function getLocalIP() {
        const localIP = await window.api.invoke("getLocalIP")
        setIP(localIP)
    }

    function getServerStatus() {
        window.api.send("emitWSServerStatus")
    }

    function monitorServerStatus() {
        window.api.on("server-status", (event, ...args) => {
            setServerStatus(args[0].status)
            console.log(serverStatus)
        })
    }

    function handleStartServer() {
        if(serverStatus == ServerStatus.CLOSE) { window.api.send("startWSServer", port) }
        else { window.api.send("stopWSServer") }
    }

    useEffect(() => { getLocalIP(); monitorServerStatus(); getServerStatus() }, [])

    return (
        <div className="items-center text-center flex flex-col space-y-4">
            <p className="w-full text-2xl font-bold">Your IP is <span className="text-green-600">{ip}</span></p>
            <div className="flex space-x-4 justify-center">
                <span className={componentStyles.label}>Port</span>
                <input type="number" max={65535} min={1} value={port} onInput={(event: React.ChangeEvent<HTMLInputElement>) => setPort(parseInt(event.target.value))} className={componentStyles.input}/>
                <button className={serverStatus == ServerStatus.CLOSE ? componentStyles.button : componentStyles.buttonDanger } onClick={handleStartServer}>
                    { serverStatus == ServerStatus.CLOSE ? "Start" : "Stop" }
                </button>
            </div>
        </div>
    )
}

export default ServerView