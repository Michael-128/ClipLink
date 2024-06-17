import React, { useEffect, useState } from "react";
import componentStyles from "../components";
import ClientStatus from "../types/ClientStatus";

function ClientView() {
    const [clientStatus, setClientStatus] = useState(ClientStatus.CLOSE)
    const [ip, setIP] = useState("")
    const [port, setPort] = useState(21888)

    function handleConnect() {
        if(ClientStatus.CLOSE) { window.api.send("startWSClient", ip, port) }
        else { window.api.send("stopWSClient") }
    }

    function getClientStatus() {
        window.api.send("emitWSClientStatus")
    }

    function monitorClientStatus() {
        window.api.on("client-status", (event, ...args) => {
            setClientStatus(args[0].status)
            console.log(clientStatus)
        })
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