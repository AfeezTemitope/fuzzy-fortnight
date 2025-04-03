import express from 'express'
import connectDB from "./config/db.js";
import productRoute from "./routes/ProductRoute.js";


const app = express()
const PORT = 5000

app.use(express.json())

app.use('/api', productRoute )


app.listen(PORT, async () => {
    await connectDB();
    console.log(`started already and started fine on port ${PORT}`)
})