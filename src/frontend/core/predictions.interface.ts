export type Coordinates = [number, number, number]

export interface BoundingBox {
    topLeft: number[]
    bottomRight: number[]
}

export type FingerType =
    | "thumb"
    | "indexFinger"
    | "middleFinger"
    | "ringFinger"
    | "pinky"
    | "palmBase"

export type Annotations = Record<FingerType, Coordinates[]>

export interface Predictions {
    handInViewConfidence: number
    boundingBox: BoundingBox
    landmarks: Coordinates[]
    annotations: Annotations
}
