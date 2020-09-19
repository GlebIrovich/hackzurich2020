import React, { useEffect, useRef } from "react"
import Webcam from "react-webcam"
// @ts-ignore
import * as handpose from "@tensorflow-models/handpose"
import { detectHandpose } from "../core/handpose"
import { Predictions } from "../core/predictions.interface"

interface Props {
    setPredictions: (predictions: Predictions) => void
}

function WebcamContainerComponent({ setPredictions }: Props) {
    const videoRef = useRef<Webcam | null>(null)
    // const videoRef =useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const videoElement = videoRef?.current?.video
        if (videoElement) {
            videoElement.onloadeddata = async () => {
                // Load the MediaPipe handpose model.
                console.time("load model")
                const model = await handpose.load()
                console.timeEnd("load model")
                setInterval(
                    () => detectHandpose(model, videoElement, setPredictions),
                    1000
                )
            }
        }
    }, [videoRef, setPredictions])

    return <Webcam ref={videoRef as any} />
}

export default WebcamContainerComponent
