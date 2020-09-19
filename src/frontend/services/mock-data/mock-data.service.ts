import data from "./data.json"
import { Predictions } from "../../core/predictions.interface"

const typedData = data as Predictions[]

function* mockDataLoop() {
    let index = 0
    while (true) {
        index++
        if (index === typedData.length) {
            index = 0
        }
        yield typedData[index]
    }
}

export const mockDataGenerator = mockDataLoop()
