import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/postRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes)
app.get("/", (req, res) => {
    res.send("API is running...");
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server running on port ${process.env.PORT || 8080}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    });
