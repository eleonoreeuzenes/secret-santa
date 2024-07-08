
import { Schema, model } from "mongoose";
import { AssignmentInterface } from "../types/assignment.interface";

const assignmentSchema = new Schema<AssignmentInterface>({
  event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  giver: { type: String, required: true },
  receiver: { type: String, required: true }
});

const AssignmentModel = model<AssignmentInterface>("Assignment", assignmentSchema);

export default AssignmentModel;
