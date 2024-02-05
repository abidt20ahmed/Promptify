import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    const mongodbUri = process.env.MONGODB_URI;

    if (!mongodbUri) {
        console.error('MONGODB_URI environment variable is not defined');
        return;
    }

    try {
        await mongoose.connect(mongodbUri, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Additional options can be added here
        });

        isConnected = true;
        console.log('MongoDB is connected');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // Throw the error or handle it appropriately based on your application's needs
        throw error;
    }
};