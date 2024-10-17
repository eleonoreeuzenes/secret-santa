export interface GiftAssignment {
  _id: string;
  event: string;
  giver: string;
  receiver: string;
  revealed: boolean;
}

export type GiftAssignmentsArray = GiftAssignment[];
