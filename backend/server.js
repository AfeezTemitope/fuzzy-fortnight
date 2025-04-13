import express from 'express';
import cors from "cors";
import path from "path"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoute from "./routes/ProductRoute.js";

dotenv.config();
const __dirname = path.resolve()
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', productRoute);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer()