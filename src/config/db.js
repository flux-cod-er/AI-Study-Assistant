
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;

        if (!MONGO_URI) {
            console.error('MONGO_URI is missing. Add it to your .env file.');
            process.exit(1);
        }
        console.log("MONGO_URI =", MONGO_URI);

        await mongoose.connect(MONGO_URI,{
        serverSelectionTimeoutMS: 60000, // 60 seconds
        connectTimeoutMS: 60000,         // 60 seconds
        socketTimeoutMS: 60000,           
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;



