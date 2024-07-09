import { Request, Response, NextFunction } from 'express';
import EventModel from '../models/event'


/**
 * Retrieves all events from the database and sends them in the response.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the retrieved events.
 * @param {NextFunction} next - The next middleware function for error handling.
 * 
 * @returns {Promise<void>} - Sends the retrieved events as a response.
 * 
 * @example
 * app.get('/events', getEvents);
 */

export const getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const events = await EventModel.find({});
      res.send(events);
  } catch (err) {
      next(err);
  }
}

/**
 * Retrieves an event by its ID from the database and sends it in the response.
 * 
 * @param {Request} req - The request object containing the event ID in the URL parameters.
 * @param {Response} res - The response object to send the retrieved event.
 * @param {NextFunction} next - The next middleware function for error handling.
 * 
 * @returns {Promise<void>} - Sends the retrieved event as a response.
 * 
 * @example
 * app.get('/events/:eventId', getEventById);
 */
export const getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const event = await EventModel.findById(req.params.eventId);;
      res.send(event);
  } catch (err) {
      next(err);
  }
}

/**
 * @description Creates a new event and saves it to the database.
 * 
 * @async
 * @function createEvent
 * @param {Request} req - The HTTP request object, containing the event details in the body.
 * @param {Response} res - The HTTP response object used to send back the created event.
 * @param {NextFunction} next - The next middleware function in the Express stack.
 * 
 * @returns {Promise<void>} - A Promise that resolves to void. Sends the saved event in the response on success.
 * 
 * @example
 * app.post('/events', createEvent);
 */
export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newEvent = new EventModel({
        organizer: req.body.organizer,
        event_name: req.body.event_name,
        event_date: new Date(req.body.event_date), 
        event_location: req.body.event_location,
        budget: req.body.budget,
        participants: req.body.participants
      });
      const savedEvent = await newEvent.save();
      res.send(savedEvent);
  } catch (err: any) {
    next(err);
  }
};

/**
 * Updates an existing event by its ID with the provided data in the request body and sends the updated event in the response.
 * 
 * @param {Request} req - The request object containing the event ID in the URL parameters and the updated data in the body.
 * @param {Response} res - The response object to send the updated event.
 * @param {NextFunction} next - The next middleware function for error handling.
 * 
 * @returns {Promise<void>} - Sends the updated event as a response.
 * 
 * @example
 * app.put('/events/:eventId', updateEvent);
 */
export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      { new: true, runValidators: true }
    );
    res.send(updatedEvent);
  } catch (err) {
    next(err);
  }
};


/**
 * Deletes an existing event by its ID and sends a confirmation message in the response.
 * 
 * @param {Request} req - The request object containing the event ID in the URL parameters.
 * @param {Response} res - The response object to send the confirmation message.
 * @param {NextFunction} next - The next middleware function for error handling.
 * 
 * @returns {Promise<void>} - Sends a confirmation message as a response.
 * 
 * @example
 * app.delete('/events/:eventId', deleteEvent);
 */
export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await EventModel.findByIdAndDelete(req.params.eventId);
    res.send({ message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
};

