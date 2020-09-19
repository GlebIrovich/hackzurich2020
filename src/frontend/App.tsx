import React, { useCallback, useEffect, useState } from "react"
import WebcamContainerComponent from "./components/webcam-container.component"
import { Card } from "@material-ui/core"
import intuitLogo from "./logos/intuit-bb-site.png"
import hackZurichLogo from "./logos/hack.png"
import logitechLogo from "./logos/Logitech_logo.svg.png"

import {
    Coordinates,
    FingerType,
    Predictions,
} from "./core/predictions.interface"
import LoaderComponent from "./components/loader/loader.component"
import styled from "styled-components"
import WidgetComponent from "./components/widget/widget.component"
import SliderComponent from "./components/slider/slider.component"

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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 400px 1fr 60px;
    justify-items: center;
    align-items: center;
    grid-gap: 2rem;
    padding: 2rem 3rem;
    grid-template-areas:
        "cat cat cat"
        "video video sliders"
        "footer footer footer";
    min-height: 100vh;
    overflow: auto;
`
const CatWidget = styled(Card)`
    grid-area: cat;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`

const SlidersWidget = styled(Card)`
    grid-area: sliders;
    position: relative;
    display: flex;
    box-sizing: border-box;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    background: #333333 !important;
`

const SlidersSet = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: whitesmoke;
    font-weight: 600;
`

const IntuitLogo = styled.img`
    position: absolute;
    z-index: 10;
    top: 92px;
    left: 17px;
    width: 124px;
    transform: rotate(-90deg);
`

const FooterLogoContainer = styled.div`
    grid-area: footer;
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    width: 100%;
`

const Logo = styled.img`
    max-height: 60px;
    margin-left: 3rem;
`

const VideoWidgetContainer = styled(WebcamContainerComponent)`
    grid-area: video;
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
    const S = (x: number) => 1 / (1 + Math.exp(-x))
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
            100
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
            <IntuitLogo src={intuitLogo} />
            <CatWidget>
                <WidgetComponent
                    thumb={thumb}
                    indexFinger={indexFinger}
                    middleFinger={middleFinger}
                    ringFinger={ringFinger}
                    pinkyFinger={pinkyFinger}
                    palmBase={palmBase}
                />
            </CatWidget>
            <SlidersWidget>
                <SlidersSet>
                    <SliderComponent value={thumb} label="Thumb" />
                    <SliderComponent value={indexFinger} label="Index finger" />
                    <SliderComponent
                        value={middleFinger}
                        label="Middle finger"
                    />
                </SlidersSet>
                <SlidersSet>
                    <SliderComponent value={ringFinger} label="Ring Finger" />
                    <SliderComponent value={pinkyFinger} label="Pinky" />
                    <SliderComponent value={palmBase} label="Palm base" />
                </SlidersSet>
            </SlidersWidget>

            <VideoWidgetContainer setPredictions={addPrediction} />
            <FooterLogoContainer>
                <Logo src={logitechLogo} />
                <Logo src={hackZurichLogo} />
            </FooterLogoContainer>
        </AppContainer>
    )
}

export default App
