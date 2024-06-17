import React, { useEffect, useState } from "react";
import componentStyles from "../components";
import ClientStatus from "../types/ClientStatus";
import { getClientIP, getClientPort, saveClientIP, saveClientPort } from "../storage";

function ClientView() {
    let isMonitoring = false
    const [clientStatus, setClientStatus] = useState(ClientStatus.CLOSE)
    const [ip, _setIP] = useState(getClientIP())
    const [port, _setPort] = useState(getClientPort())

    function setPort(port: number) {
        _setPort(port)
        saveClientPort(port)
    }

    function setIP(ip: string) {
        _setIP(ip)
        saveClientIP(ip)
    }


    function handleConnect() {
        if(clientStatus === ClientStatus.CLOSE) { window.api.send("startWSClient", ip, port) }
        else { window.api.send("stopWSClient") }
    }

    function getClientStatus() {
        window.api.send("emitWSClientStatus")
    }

    function monitorClientStatus() {
        if(isMonitoring) return
        window.api.on("client-status", (event, ...args) => {
            setClientStatus(args[0].status)
            console.log(clientStatus)
        })
        isMonitoring = true
    }

    useEffect(() => { monitorClientStatus(); getClientStatus() }, [])

    return (
        <div className="items-center text-center flex flex-col space-y-4">
            <table>
                <tr>
                    <td className="px-2 py-2"><span className={componentStyles.label}>IP</span></td>
                    <td><input placeholder="IP Address" value={ip} onInput={(event: React.ChangeEvent<HTMLInputElement>) => setIP(event.target.value)} className={componentStyles.input}/></td>
                </tr>
                <tr>
                    <td className="px-2 py-2"><span className={componentStyles.label}>Port</span></td>
                    <td><input placeholder="Port" type="number" value={port} onInput={(event: React.ChangeEvent<HTMLInputElement>) => setPort(parseInt(event.target.value))} className={componentStyles.input}/></td>
                </tr>
            </table>

            <button className={ clientStatus == ClientStatus.CLOSE ? componentStyles.button : componentStyles.buttonDanger } onClick={handleConnect}>{ clientStatus == ClientStatus.CLOSE ? "Connect" : "Disconnect" }</button>
        </div>
    )
}

export default ClientView