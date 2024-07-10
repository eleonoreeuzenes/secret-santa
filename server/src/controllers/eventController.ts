import { Request, Response, NextFunction } from 'express';
import EventModel from '../models/event'
import AssignmentModel from '../models/assignment';

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

      const participants = req.body.participants;
      const secretSantaPairs = generateSecretSanta(participants);
  
      const assignments = secretSantaPairs.map(pair => ({
        event: savedEvent._id,
        giver: pair.giver,
        receiver: pair.receiver
      }));
  
      await AssignmentModel.insertMany(assignments);
  
      
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


function generateSecretSanta(participants: string[]): { giver: string, receiver: string }[] {
  if (participants.length < 2) {
    throw new Error("Il doit y avoir au moins deux participants");
  }

  let givers = [...participants];
  let receivers = [...participants];

  function shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function validPairing(givers: string[], receivers: string[]): boolean {
    for (let i = 0; i < givers.length; i++) {
      if (givers[i] === receivers[i]) {
        return false;
      }
    }
    return true;
  }

  let attempts = 0;
  do {
    receivers = shuffle(receivers);
    attempts++;
  } while (!validPairing(givers, receivers) && attempts < 1000);

  if (attempts === 1000) {
    throw new Error("Impossible de trouver une répartition valide après 1000 tentatives");
  }

  let secretSantaPairs = [];
  for (let i = 0; i < givers.length; i++) {
    secretSantaPairs.push({ giver: givers[i], receiver: receivers[i] });
  }

  return secretSantaPairs;
}