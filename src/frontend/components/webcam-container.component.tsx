import React, { useCallback, useEffect, useRef } from "react"
// @ts-ignore
import { Predictions } from "../core/predictions.interface"
import { main } from "../core/visualizerV2"
import styled from "styled-components"

const CanvasWrapper = styled.div`
    position: relative;
    display: inline-block;
    vertical-align: top;
`

const ScatterContainer = styled.div`
    display: inline-block;
    vertical-align: top;
`

const Video = styled.video`
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    visibility: hidden;
    width: auto;
    height: auto;
    position: absolute;
`

interface Props {
    setPredictions: (predictions: Predictions[]) => void
}

function WebcamContainerComponent({ setPredictions }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const scatterContainerRef = useRef<HTMLDivElement | null>(null)

    const pause = useCallback(
        () => videoRef?.current && videoRef?.current.pause(),
        [videoRef]
    )

    useEffect(() => {
        const videoElement = videoRef?.current
        const canvas = canvasRef?.current
        const scatterContainer = scatterContainerRef?.current

        if (videoElement && canvas && scatterContainer) {
            main(setPredictions)
        }
    }, [videoRef, canvasRef, scatterContainerRef, setPredictions])

    return (
        <React.Fragment>
            <CanvasWrapper>
                {/*<Webcam ref={videoRef as any} />*/}
                <Video id="video" ref={videoRef} />
                <canvas id="output" ref={canvasRef} />
            </CanvasWrapper>
            <ScatterContainer
                id="scatter-gl-container"
                ref={scatterContainerRef}
            />

            <button onChange={pause}>Pause</button>
        </React.Fragment>
    )
}

export default WebcamContainerComponent
