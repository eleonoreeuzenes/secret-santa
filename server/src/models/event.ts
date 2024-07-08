
import { Schema, model } from "mongoose";
import { EventInterface } from "../types/event.interface";

const eventSchema = new Schema<EventInterface>({
  organizer: { type: String, required: true },
  event_name: { type: String, required: true },
  event_date: { type: Date, required: true },
  event_location: { type: String},
  budget: { type: Number, required: true },
  participants: { type: [String], required: true }
});

const EventModel = model<EventInterface>("Event", eventSchema);

export default EventModel;