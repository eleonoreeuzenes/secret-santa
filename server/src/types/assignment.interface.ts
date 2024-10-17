import { Schema, Document, Types } from "mongoose";

export interface Assignment {
  event: Types.ObjectId; 
  giver: string; 
  receiver: string; 
  revealed: Boolean;
}

export interface AssignmentInterface
 extends Document, Assignment {}
