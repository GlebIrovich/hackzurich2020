import React, { useState } from "react"
import "./App.css"
import WebcamContainerComponent from "./components/webcam-container.component"
import { Predictions } from "./core/predictions.interface"

function App() {
    const [predictions, setPredictions] = useState<Predictions | undefined>()

    return (
        <div className="App">
            <h1>{predictions ? "Ready" : "Warming up, please stand by"}</h1>
            <WebcamContainerComponent setPredictions={setPredictions} />
        </div>
    )
}

export default App
