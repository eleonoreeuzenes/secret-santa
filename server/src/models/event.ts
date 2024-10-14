import { Schema, model, Document, Types } from "mongoose";
import { EventInterface } from "../types/event.interface";

const eventSchema = new Schema<EventInterface & Document>({
  organizer: { type: String, required: true },
  event_name: { type: String, required: true },
  event_date: { type: Date, required: true },
  event_location: { type: String, required: true },
  budget: { type: Number, required: true },
  participants: {
    type: [
      {
        type: String,
        required: true
      }
    ],
    validate: {
      validator: function(participants: string[]) {
        return participants.length >= 3;
      },
      message: 'There must be at least 3 participants'
    }
  }
});

export default model<EventInterface>("Event", eventSchema);
