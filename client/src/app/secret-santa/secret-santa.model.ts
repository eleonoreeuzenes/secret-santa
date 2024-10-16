export interface SecretSanta  {
  organizer : string;
  event_name: string;
  event_date: string;
  event_location: string;
  budget: string | number;
  participants: string[];

}

export interface SecretSantaResponse extends SecretSanta {
  _id: string;
  organizer : string;
  event_name: string;
  event_date: string;
  event_location: string;
  budget: string | number;
  participants: string[];
}
