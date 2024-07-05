import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the specified .env file
dotenv.config({ path: '../../.env' });

const app = express();
const httpServer = createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Ensure URL_MONGO is defined
const dbUrl = process.env.URL_MONGO;
if (!dbUrl) {
  throw new Error('URL_MONGO environment variable is not defined');
}

mongoose.connect(dbUrl).then(() => {
    console.log('Connected to MongoDB');
    httpServer.listen(8081, () => {
        console.log('listening on *:8081');
    });
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
});
