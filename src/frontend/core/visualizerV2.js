/* eslint-disable */
import * as handpose from "@tensorflow-models/handpose"
import * as tf from "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-backend-webgl"

function isMobile() {
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    return isAndroid || isiOS
}

let videoWidth,
    videoHeight,
    rafID,
    ctx,
    canvas,
    ANCHOR_POINTS,
    scatterGLHasInitialized = false,
    scatterGL,
    fingerLookupIndices = {
        thumb: [0, 1, 2, 3, 4],
        indexFinger: [0, 5, 6, 7, 8],
        middleFinger: [0, 9, 10, 11, 12],
        ringFinger: [0, 13, 14, 15, 16],
        pinky: [0, 17, 18, 19, 20],
    } // for rendering each finger as a polyline

const VIDEO_WIDTH = 300
const VIDEO_HEIGHT = 250
const mobile = isMobile()
// Don't render the point cloud on mobile in order to maximize performance and
// to avoid crowding limited screen space.
const renderPointcloud = mobile === false

const state = {
    backend: "webgl",
}

if (renderPointcloud) {
    state.renderPointcloud = true
}

function drawPoint(y, x, r) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
}

function drawKeypoints(keypoints) {
    const keypointsArray = keypoints

    for (let i = 0; i < keypointsArray.length; i++) {
        const y = keypointsArray[i][0]
        const x = keypointsArray[i][1]
        drawPoint(x - 2, y - 2, 3)
    }

    const fingers = Object.keys(fingerLookupIndices)
    for (let i = 0; i < fingers.length; i++) {
        const finger = fingers[i]
        const points = fingerLookupIndices[finger].map((idx) => keypoints[idx])
        drawPath(points, false)
    }
}

function drawPath(points, closePath) {
    const region = new Path2D()
    region.moveTo(points[0][0], points[0][1])
    for (let i = 1; i < points.length; i++) {
        const point = points[i]
        region.lineTo(point[0], point[1])
    }

    if (closePath) {
        region.closePath()
    }
    ctx.stroke(region)
}

let model

async function setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
            "Browser API navigator.mediaDevices.getUserMedia not available"
        )
    }

    const video = document.getElementById("video")
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            facingMode: "user",
            // Only setting the video to a specified size in order to accommodate a
            // point cloud, so on mobile devices accept the default size.
            width: mobile ? undefined : VIDEO_WIDTH,
            height: mobile ? undefined : VIDEO_HEIGHT,
        },
    })
    video.srcObject = stream

    return new Promise((resolve) => {
        video.addEventListener("loadedmetadata", () => {
            resolve(video)
        })
    })
}

async function loadVideo() {
    const video = await setupCamera()
    video.play()
    return video
}

export async function main(setPredictions) {
    await tf.setBackend(state.backend)
    model = await handpose.load()
    let video
    try {
        video = await loadVideo()
    } catch (e) {
        throw e
    }

    videoWidth = video.videoWidth
    videoHeight = video.videoHeight

    canvas = document.getElementById("output")
    canvas.width = videoWidth
    canvas.height = videoHeight
    video.width = videoWidth
    video.height = videoHeight

    ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, videoWidth, videoHeight)
    ctx.strokeStyle = "red"
    ctx.fillStyle = "red"

    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)

    // These anchor points allow the hand pointcloud to resize according to its
    // position in the input.
    ANCHOR_POINTS = [
        [0, 0, 0],
        [0, -VIDEO_HEIGHT, 0],
        [-VIDEO_WIDTH, 0, 0],
        [-VIDEO_WIDTH, -VIDEO_HEIGHT, 0],
    ]

    if (renderPointcloud) {
        scatterGL = new ScatterGL(
            document.querySelector("#scatter-gl-container"),
            {
                rotateOnStart: false,
                selectEnabled: false,
                styles: {
                    backgroundColor: "rgb(219, 219, 219)",
                },
            }
        )
    }

    landmarksRealTime(video, setPredictions)
}

const landmarksRealTime = async (video, setPredictions) => {
    async function frameLandmarks() {
        ctx.drawImage(
            video,
            0,
            0,
            videoWidth,
            videoHeight,
            0,
            0,
            canvas.width,
            canvas.height
        )
        const predictions = await model.estimateHands(video)
        setPredictions(predictions)
        if (predictions.length > 0) {
            const result = predictions[0].landmarks
            drawKeypoints(result, predictions[0].annotations)

            if (renderPointcloud === true && scatterGL != null) {
                const pointsData = result.map((point) => {
                    return [-point[0], -point[1], -point[2]]
                })

                const dataset = new ScatterGL.Dataset([
                    ...pointsData,
                    ...ANCHOR_POINTS,
                ])

                if (!scatterGLHasInitialized) {
                    scatterGL.render(dataset)

                    const fingers = Object.keys(fingerLookupIndices)

                    scatterGL.setSequences(
                        fingers.map((finger) => ({
                            indices: fingerLookupIndices[finger],
                        }))
                    )
                    scatterGL.setPointColorer((index) => {
                        if (index < pointsData.length) {
                            return "#00e7d4"
                        }
                        return "white" // Hide.
                    })
                } else {
                    scatterGL.updateDataset(dataset)
                }
                scatterGLHasInitialized = true
            }
        }
        rafID = requestAnimationFrame(frameLandmarks)
    }

    frameLandmarks()
}

navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia
