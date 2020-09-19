import React, { useCallback, useEffect, useState } from "react"
import WebcamContainerComponent from "./components/webcam-container.component"
import Slider from "@material-ui/core/Slider"
import {
    Coordinates,
    FingerType,
    Predictions,
} from "./core/predictions.interface"
import LoaderComponent from "./components/loader/loader.component"
import styled from "styled-components"

const StyledLoader = styled(LoaderComponent)`
    background: #00e7d4;
    position: absolute;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    z-index: 100;
`

const AppContainer = styled.div`
    position: relative;
`

function throttle(callback: (param: any) => void, timeout: number) {
    let shouldThrottle = false
    return function (param: any) {
        if (!shouldThrottle) {
            callback(param)
            shouldThrottle = true
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
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!isLoaded && prediction) {
            setIsLoaded(true)
        }
    }, [isLoaded, prediction])

    const addPrediction = useCallback(
        throttle(
            (newPredictions: Predictions[]) =>
                setPredictions(newPredictions[0]),
            200
        ),
        [setPredictions]
    )

    const getDataByType = (type: FingerType) =>
        prediction
            ? getValueFromCoordinates(prediction.annotations[type][0])
            : 0

    const thumb = getDataByType("thumb")
    const indexFinger = getDataByType("indexFinger")
    const middleFinger = getDataByType("middleFinger")
    const ringFinger = getDataByType("ringFinger")
    const pinkyFinger = getDataByType("pinky")
    const palmBase = getDataByType("palmBase")

    return (
        <AppContainer>
            {isLoaded ? null : <StyledLoader />}

            <div>
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
        </AppContainer>
    )
}

export default App
