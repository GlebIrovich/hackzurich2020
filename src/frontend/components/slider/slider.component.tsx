import React from "react"
import Slider from "@material-ui/core/Slider"

interface Props {
    value: number
    label: string
}

function SliderComponent({ value, label }: Props) {
    return (
        <div>
            <div>{label}</div>
            <Slider
                style={{ width: 200, display: "block" }}
                value={value}
                aria-labelledby="continuous-slider"
            />
        </div>
    )
}

export default SliderComponent
