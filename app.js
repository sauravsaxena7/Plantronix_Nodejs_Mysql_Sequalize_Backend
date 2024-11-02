
import express from "express";
import cors from "cors";
import rootsRouter from "./src/routes/roots.route.js"
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


// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error("Error handled by error middleware:", err.message);

    // Customize the response based on the error type
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "An unexpected error occurred",
    });
});


export {app}
