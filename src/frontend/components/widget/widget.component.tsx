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

const StyledInfoWidget = styled.div`
    font-size: 20px;
    color: ${(props: any) => props.color};
`

const WidgetContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width: 100%;
    padding-right: 2rem;
    box-sizing: border-box;
`

const CatContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    justify-content: center;
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
            <StyledInfoWidget>Size: {size}px</StyledInfoWidget>
            <StyledInfoWidget color={color}>Color: {color}</StyledInfoWidget>
            <CatContainer>
                <Cat size={size} mood="excited" color={color} />
            </CatContainer>
        </WidgetContainer>
    )
}

export default WidgetComponent
