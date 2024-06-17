import React, { FormEvent, useState } from "react";

function App() {
    const [serverPort, setServerPort] = useState(8081)

    const [clientIP, setClientIP] = useState("localhost")
    const [clientPort, setClientPort] = useState(8081)

    window.api.on("server-status", (event, ...args) => { console.log(args[0].status) })

    function handleServerSubmit() {
        window.api.send("startWSServer", serverPort)
    }

    function stopServer() {
        window.api.send("stopWSServer")
    }

    function handleClientSubmit() {
        window.api.send("startWSClient", clientIP, clientPort)
    }


    return (
        <div>
            <h2>Server</h2>

            <table>
                <tbody>
                    <tr>
                        <td>Port</td>
                        <td><input type="number" name="port" value={serverPort} onInput={(event: React.ChangeEvent<HTMLInputElement>) => setServerPort(parseInt(event.target.value))}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button type="submit" onClick={handleServerSubmit}>Start</button><button type="submit" onClick={stopServer}>Stop</button></td>
                    </tr>
                </tbody>
            </table>

            <form>
                <h2>Client</h2>

                <table>
                    <tbody>
                        <tr>
                            <td>Server IP</td>
                            <td><input name="ip" value={clientIP} onInput={(event: React.ChangeEvent<HTMLInputElement>) => setClientIP(event.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Server Port</td>
                            <td><input type="number" name="port" value={clientPort} onInput={(event: React.ChangeEvent<HTMLInputElement>) => setClientPort(parseInt(event.target.value))}/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button type="submit" onClick={handleClientSubmit}>Start</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default App