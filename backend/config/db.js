import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        console.log('Attempting to connect to:', process.env.MONGO_URI);
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;