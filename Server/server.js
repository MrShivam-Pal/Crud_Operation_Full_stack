import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

//config
dotenv.config();

//database connection
dbConnect();

//express app
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);

app.get('/', (req, res) => {
    res.json({
        message: "hello"
    })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => `Server is starting on port ${PORT}`);