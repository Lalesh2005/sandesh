import express from "express";
import cors from "cors";
import AuthRouter from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Chat API Running"
    });
});

app.use("/api/auth", AuthRouter);

export default app;