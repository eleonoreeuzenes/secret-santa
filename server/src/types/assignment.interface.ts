import { Schema, Document, Types } from "mongoose";

export interface Assignment {
  event: Types.ObjectId; 
  giver: string; 
  receiver: string; 
}

export interface AssignmentInterface
 extends Document, Assignment {}
