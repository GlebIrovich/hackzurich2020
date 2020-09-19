import React from "react"
import { Cat } from "react-kawaii"
import styled from "styled-components"

export interface ProcessedData {
    thumb: number
    indexFinger: number
    middleFinger: number
    ringFinger: number
    pinkyFinger: number
    palmBase: number
}

const WidgetContainer = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    align-items: center;
    padding: 1rem;
    background: #00e7d4;
`

interface Prop extends ProcessedData {}

const rescaleSize = (size: number) => {
    const oldRange = 100
    const newRange = 400 - 200
    return (size * newRange) / oldRange + 200
}

const toSize = (size: number) => rescaleSize(size)

const toRgbRange = (value: number) => {
    const oldRange = 100
    const newRange = 255
    return Math.floor((value * newRange) / oldRange)
}

const toRgb = (r: number, g: number, b: number) => {
    return `rgb(${toRgbRange(r)}, ${toRgbRange(g)}, ${toRgbRange(b)})`
}

function WidgetComponent(props: Prop) {
    const size = toSize(props.indexFinger)
    const color = toRgb(props.thumb, props.middleFinger, props.pinkyFinger)

    return (
        <WidgetContainer>
            <Cat size={size} mood="excited" color={color} />
        </WidgetContainer>
    )
}

export default WidgetComponent
