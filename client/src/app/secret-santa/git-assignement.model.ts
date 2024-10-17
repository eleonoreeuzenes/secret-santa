export interface GiftAssignment {
  _id: string; 
  event: string;
  giver: string;
  receiver: string;
}

export type GiftAssignmentsArray = GiftAssignment[];
