import React, { useCallback, useState } from "react"
import WebcamContainerComponent from "./components/webcam-container.component"
import { Predictions } from "./core/predictions.interface"

function App() {
    const [predictions, setPredictions] = useState<Predictions | null>(null)

    const addPrediction = useCallback(
        (newPredictions: Predictions[]) => setPredictions(newPredictions[0]),
        []
    )

    return (
        <div className="App">
            <h1>{predictions ? "Ready" : "Warming up, please stand by"}</h1>
            <WebcamContainerComponent setPredictions={addPrediction} />
        </div>
    )
}

export default App
