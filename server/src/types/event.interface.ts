import { Schema, Document } from "mongoose";

export interface Event {
  organizer: string;
  event_name: string;
  event_date: string;
  event_location: string;
  budget : number;
  participants: string[];
}

export interface EventInterface
 extends Document, Event {}
