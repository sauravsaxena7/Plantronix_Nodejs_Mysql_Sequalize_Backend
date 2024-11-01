
import express from "express";
import cors from "cors";
import rootsRouter from "./routes/roots.route"
const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

app.use(cors())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use("/api/v1", rootsRouter);

// app.use(errorMiddleware); // Centralized error handling

export {app}
