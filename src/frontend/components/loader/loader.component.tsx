import React from "react"
import "./loader.component.css"

interface Props {
    className?: string
}

function LoaderComponent({ className }: Props) {
    return (
        <div className={className}>
            <div className="loading">
                <div className="finger finger-1">
                    <div className="finger-item">
                        <span />
                        <i />
                    </div>
                </div>
                <div className="finger finger-2">
                    <div className="finger-item">
                        <span />
                        <i />
                    </div>
                </div>
                <div className="finger finger-3">
                    <div className="finger-item">
                        <span />
                        <i />
                    </div>
                </div>
                <div className="finger finger-4">
                    <div className="finger-item">
                        <span />
                        <i />
                    </div>
                </div>
                <div className="last-finger">
                    <div className="last-finger-item">
                        <i />
                    </div>
                </div>
            </div>

            <div className="credits-info">
                <p>
                    Source on{" "}
                    <a href="http://drbl.in/1945392" target="_blank">
                        Dribbble
                    </a>
                    .
                </p>
                <p>
                    <a href="https://twitter.com/r4ms3scz" target="_blank">
                        @r4ms3scz
                    </a>{" "}
                    <span>x</span>{" "}
                    <a href="https://twitter.com/ToshTak" target="_blank">
                        @ToshTak
                    </a>
                </p>
                <p>
                    <a href="" />
                </p>
            </div>
        </div>
    )
}

export default LoaderComponent
