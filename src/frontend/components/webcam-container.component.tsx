import React, { useEffect, useRef } from "react"
// @ts-ignore
import { Predictions } from "../core/predictions.interface"
import { main } from "../core/visualizerV2"
import styled from "styled-components"
import { Card } from "@material-ui/core"

const CanvasWrapper = styled(Card)`
    position: relative;
    vertical-align: top;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
    background: #333333 !important;
`

const ScatterContainer = styled(Card)`
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
    background: rgb(219, 219, 219) !important;
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
        </React.Fragment>
    )
}

export default WebcamContainerComponent
