import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

console.log("APP ", process.env.CORS_ORIGIN);

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true, limit: "16kb"
}))

app.use(express.static("public")) //For any other files like images etc, same name folder must be created in root dir

app.use(cookieParser()) //cookieParser() populates req.cookies, which will be available in json

// ----------------------------------------------------------------------------------------------------------------

import {router} from "./routes/user.routes.js";
import {questionRouter} from "./routes/question.routes.js";
import {answerRouter} from "./routes/answer.routes.js";

app.use("/api", router)
app.use("/api", questionRouter)
app.use("/api", answerRouter)

export default app