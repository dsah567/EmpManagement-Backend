import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//routes import

import userRouter from "./routes/user.routes.js";
import empRouter from "./routes/emp.routes.js";

//routes declearation
app.get("/",(req, res) => {
    res.send('hello world')
})
app.use("/api/v1/users",userRouter)
app.use("/api/v1/employee",empRouter)

export {app}