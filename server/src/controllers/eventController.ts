import { Request, Response, NextFunction } from 'express';
import * as EventService from '../services/eventService';

export const getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const events = await EventService.getAllEvents();
        res.send(events);
    } catch (err) {
        next(err);
    }
}

export const getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const event = await EventService.getEventById(req.params.eventId);
        res.send(event);
    } catch (err) {
        next(err);
    }
}

export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const savedEvent = await EventService.createEvent(req.body);
        res.send(savedEvent);
    } catch (err) {
        next(err);
    }
}

export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedEvent = await EventService.updateEvent(req.params.eventId, req.body);
        res.send(updatedEvent);
    } catch (err) {
        next(err);
    }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await EventService.deleteEvent(req.params.eventId);
        res.send(result);
    } catch (err) {
        next(err);
    }
}
