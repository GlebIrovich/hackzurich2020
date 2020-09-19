import React from "react"
import Slider from "@material-ui/core/Slider"
import withStyles from "@material-ui/core/styles/withStyles"

interface Props {
    value: number
    label: string
}

const PrettoSlider = withStyles({
    root: {
        color: "#00e7d4",
        height: 8,
    },
    track: {
        height: 5,
        borderRadius: 4,
    },
    rail: {
        height: 3,
        borderRadius: 4,
    },
})(Slider)

function SliderComponent({ value, label }: Props) {
    return (
        <div>
            <div>{label}</div>
            <PrettoSlider
                color="primary"
                style={{ width: 150, display: "block" }}
                value={value}
                aria-labelledby="continuous-slider"
            />
        </div>
    )
}

export default SliderComponent
