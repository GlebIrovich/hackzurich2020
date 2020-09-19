export type Coordinates = [number, number, number]

export interface BoundingBox {
    topLeft: number[];
    bottomRight: number[];
}

export interface Annotations {
    thumb: Coordinates[];
    indexFinger: Coordinates[];
    middleFinger: Coordinates[];
    ringFinger: Coordinates[];
    pinky: Coordinates[];
    palmBase: Coordinates[];
}

export interface Predictions {
    handInViewConfidence: number;
    boundingBox: BoundingBox;
    landmarks: Coordinates[];
    annotations: Annotations;
}

