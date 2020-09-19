import { withStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import WebcamContainerComponent from "./components/webcam-container.component"
import Slider from '@material-ui/core/Slider';
import { Predictions, Coordinates } from "./core/predictions.interface"
import { mockDataGenerator } from "./services/mock-data/mock-data.service"

function App() {
    const [predictions, setPredictions] = useState<Predictions[]>([])

    const [count, setCount] = useState<number>(0)

    const [thumb, setThumb] = useState<number>(0)
    const [indexFinger, setIndexFinger] = useState<number>(0)
    const [middleFinger, setMiddleFinger] = useState<number>(0)
    const [ringFinger, setRingFinger] = useState<number>(0)
    const [pinkyFinger, setPinkyFinger] = useState<number>(0)
    const [palmBase, setPalmBase] = useState<number>(0)

    const getValueFromCordinates = ([x,y,z]:Coordinates) => {
        const t = ((x+1000)+2001*(y+1000)+2001*2001*(z+1000))/(2001*2001*2001-1)
        const S = (x:Number) => 1/(1+Math.exp(-x))
        const scale = 180
        const w = (S(scale*(t-0.5)) - S(-scale/2))/(S(scale/2) - S(-scale/2))
        return Math.round(w*99+1)
    }

    const addPrediction = (predictions: Predictions[]) =>
        setPredictions((state) => state.concat(predictions))

    const data = predictions[predictions.length -1]
    if(data) {
        setThumb(getValueFromCordinates(data.annotations.thumb[0]))
        setIndexFinger(getValueFromCordinates(data.annotations.indexFinger[0]))
        setMiddleFinger(getValueFromCordinates(data.annotations.middleFinger[0]))
        setRingFinger(getValueFromCordinates(data.annotations.ringFinger[0]))
        setPinkyFinger(getValueFromCordinates(data.annotations.pinky[0]))
        setPalmBase(getValueFromCordinates(data.annotations.palmBase[0]))
    }
console.log(predictions)



    // useEffect(() => {
    //     const interval = setTimeout(() => {
    //         setCount(count + 1)
    //         const data = mockDataGenerator.next().value as Predictions
    //         setThumb(getValueFromCordinates(data.annotations.thumb[0]))
    //         setIndexFinger(getValueFromCordinates(data.annotations.indexFinger[0]))
    //         setMiddleFinger(getValueFromCordinates(data.annotations.middleFinger[0]))
    //         setRingFinger(getValueFromCordinates(data.annotations.ringFinger[0]))
    //         setPinkyFinger(getValueFromCordinates(data.annotations.pinky[0]))
    //         setPalmBase(getValueFromCordinates(data.annotations.palmBase[0]))
    //     }, 1000)
    // })

    return (
        <div className="App">
            <h1>{predictions ? "Ready" : "Warming up, please stand by"}</h1>

            <p>{predictions}</p>

            <div style={{ padding: '50px' }}>
                <p>{count}</p>
                <p>{thumb}</p>
                <p>{indexFinger}</p>
                <p>{middleFinger}</p>
                <p>{ringFinger}</p>
                <p>{pinkyFinger}</p>
                <p>{palmBase}</p>

                <Slider style={{width: 200, display: 'block' }} value={thumb} aria-labelledby="continuous-slider" />
                <Slider style={{width: 200, display: 'block' }} value={indexFinger} aria-labelledby="continuous-slider" />
                <Slider style={{width: 200, display: 'block' }} value={middleFinger} aria-labelledby="continuous-slider" />
                <Slider style={{width: 200, display: 'block' }} value={ringFinger} aria-labelledby="continuous-slider" />
                <Slider style={{width: 200, display: 'block' }} value={pinkyFinger} aria-labelledby="continuous-slider" />
                <Slider style={{width: 200, display: 'block' }} value={palmBase} aria-labelledby="continuous-slider" />
            </div>

            <WebcamContainerComponent setPredictions={addPrediction} />
        </div>
    )
}

export default App
