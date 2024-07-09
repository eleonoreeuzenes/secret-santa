import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as eventController from './controllers/eventController';
import bodyParser from 'body-parser';
import cors from 'cors';

// Load environment variables from the specified .env file
dotenv.config({ path: '../../.env' });

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes for event operations
app.post('/api/event', eventController.createEvent);
app.get('/api/events', eventController.getEvents);
app.get('/api/events/:eventId', eventController.getEventById);
app.put('/api/events/:eventId', eventController.updateEvent);
app.delete('/api/events/:eventId', eventController.deleteEvent);

// Ensure URL_MONGO is defined
const dbUrl = process.env.URL_MONGO;
if (!dbUrl) {
  throw new Error('URL_MONGO environment variable is not defined');
}

mongoose.connect(dbUrl).then(() => {
    console.log('Connected to MongoDB');
    httpServer.listen(3000, () => {
        console.log('listening on *:3000');
    });
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
});
