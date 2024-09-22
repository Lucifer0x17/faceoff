import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes';
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors())
app.use(express.json());
app.use('/api', projectRoutes);

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);  // Exit process with failure
    }
};

// Call the async MongoDB connection function
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, MongoDB with Express and TypeScript!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});