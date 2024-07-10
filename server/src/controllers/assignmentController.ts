import { Request, Response, NextFunction } from 'express';
import AssignmentModel from '../models/assignment';

// Create an assignment
export const createAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newAssignment = new AssignmentModel(req.body);
    const savedAssignment = await newAssignment.save();
    res.send(savedAssignment);
  } catch (err: any) {
    next(err);
  }
};

// Get all assignments
export const getAssignments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const assignments = await AssignmentModel.find();
    res.send(assignments);
  } catch (err: any) {
    next(err);
  }
};

// Get assignments by event ID
export const getAssignmentsByEventId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const assignments = await AssignmentModel.find({ event: req.params.eventId });
    res.send(assignments);
  } catch (err: any) {
    next(err);
  }
};

// Update an assignment
export const updateAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
      req.params.assignmentId,
      req.body,
      { new: true, runValidators: true }
    );
    res.send(updatedAssignment);
  } catch (err: any) {
    next(err);
  }
};

// Delete an assignment
export const deleteAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await AssignmentModel.findByIdAndDelete(req.params.assignmentId);
    res.send({ message: 'Assignment deleted' });
  } catch (err: any) {
    next(err);
  }
};
