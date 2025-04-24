import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
// Connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';
const DB_NAME = 'studentsDB'; // Ensure consistent database name
// Mongoose connection
const db = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Mongoose connection established.');
        return mongoose.connection;
    }
    catch (error) {
        console.error('Mongoose connection error:', error);
        throw new Error('Mongoose connection failed.');
    }
};
// MongoDB native client
let client;
export const getClient = () => {
    if (!client) {
        client = new MongoClient(MONGODB_URI);
    }
    return client;
};
export const getDatabase = async () => {
    if (!client) {
        client = getClient();
    }
    // Check connection status (updated for newer MongoDB driver versions)
    try {
        // For newer versions of MongoDB driver
        await client.connect();
        return client.db(DB_NAME);
    }
    catch (error) {
        console.error('Native MongoDB connection error:', error);
        throw new Error('Native MongoDB connection failed.');
    }
};
export default db;
