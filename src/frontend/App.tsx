import React, { useCallback, useState } from "react"
import WebcamContainerComponent from "./components/webcam-container.component"
import Slider from "@material-ui/core/Slider"
import {
    Coordinates,
    FingerType,
    Predictions,
} from "./core/predictions.interface"

function throttle(callback: (param: any) => void, timeout: number) {
    let shouldThrottle = false
    return function (param: any) {
        console.log(shouldThrottle)
        if (!shouldThrottle) {
            callback(param)
            shouldThrottle = true
            console.log(shouldThrottle)
            setTimeout(function () {
                shouldThrottle = false
            }, timeout)
        }
    }
}

const getValueFromCoordinates = ([x, y, z]: Coordinates) => {
    const t =
        (x + 1000 + 2001 * (y + 1000) + 2001 * 2001 * (z + 1000)) /
        (2001 * 2001 * 2001 - 1)
    const S = (x: Number) => 1 / (1 + Math.exp(-x))
    const scale = 180
    const w =
        (S(scale * (t - 0.5)) - S(-scale / 2)) / (S(scale / 2) - S(-scale / 2))
    return Math.round(w * 99 + 1)
}

function App() {
    const [prediction, setPredictions] = useState<Predictions | null>(null)

    const addPrediction = useCallback(
        throttle(
            (newPredictions: Predictions[]) =>
                setPredictions(newPredictions[0]),
            1000
        ),
        [setPredictions]
    )

    const getDataByType = (type: FingerType) =>
        prediction
            ? getValueFromCoordinates(prediction.annotations[type][0])
            : 0
    console.log(prediction)

    const thumb = getDataByType("thumb")
    const indexFinger = getDataByType("indexFinger")
    const middleFinger = getDataByType("middleFinger")
    const ringFinger = getDataByType("ringFinger")
    const pinkyFinger = getDataByType("pinky")
    const palmBase = getDataByType("palmBase")

    return (
        <div className="App">
            <h1>{prediction ? "Ready" : "Warming up, please stand by"}</h1>

            <p>{JSON.stringify(prediction)}</p>

            <div style={{ padding: "50px" }}>
                <p>{thumb}</p>
                <p>{indexFinger}</p>
                <p>{middleFinger}</p>
                <p>{ringFinger}</p>
                <p>{pinkyFinger}</p>
                <p>{palmBase}</p>

                <Slider
                    style={{ width: 200, display: "block" }}
                    value={thumb}
                    aria-labelledby="continuous-slider"
                />
                <Slider
                    style={{ width: 200, display: "block" }}
                    value={indexFinger}
                    aria-labelledby="continuous-slider"
                />
                <Slider
                    style={{ width: 200, display: "block" }}
                    value={middleFinger}
                    aria-labelledby="continuous-slider"
                />
                <Slider
                    style={{ width: 200, display: "block" }}
                    value={ringFinger}
                    aria-labelledby="continuous-slider"
                />
                <Slider
                    style={{ width: 200, display: "block" }}
                    value={pinkyFinger}
                    aria-labelledby="continuous-slider"
                />
                <Slider
                    style={{ width: 200, display: "block" }}
                    value={palmBase}
                    aria-labelledby="continuous-slider"
                />
            </div>

            <WebcamContainerComponent setPredictions={addPrediction} />
        </div>
    )
}

export default App
