import React, { useState } from "react"
import WebcamContainerComponent from "./components/webcam-container.component"
import { Predictions } from "./core/predictions.interface"
import { mockDataGenerator } from "./services/mock-data/mock-data.service"

function App() {
    const [predictions, setPredictions] = useState<Predictions[]>([])

    const addPrediction = (predictions: Predictions[]) =>
        setPredictions((state) => state.concat(predictions))
    console.log(predictions)

    console.log(mockDataGenerator.next().value)

    return (
        <div className="App">
            <h1>{predictions ? "Ready" : "Warming up, please stand by"}</h1>
            <WebcamContainerComponent setPredictions={addPrediction} />
        </div>
    )
}

export default App
