const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const app = express()

app.use(morgan("tiny"))
app.use(bodyParser.json())

app.get("/api/v1/ping", (req, res) => {
    res.send({ response: "pong" }).status(200)
})

app.post("/api/v1/predictions", (req, res) => {
    console.log(req.body)
    res.send({ response: "I am alive" }).status(200)
})

const port = process.env.PORT || 9000
app.listen(port)
console.info(`Server is listening on port ${port}`)
