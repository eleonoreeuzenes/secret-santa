import EventModel from '../models/event';
import AssignmentModel from '../models/assignment';

interface SecretSantaPair {
    giver: string;
    receiver: string;
}

export const getAllEvents = async () => {
    return await EventModel.find({});
};

export const getEventById = async (eventId: string) => {
    return await EventModel.findById(eventId);
};

export const createEvent = async (eventData: any) => {
    const newEvent = new EventModel({
        organizer: eventData.organizer,
        event_name: eventData.event_name,
        event_date: eventData.event_date, 
        event_location: eventData.event_location,
        budget: eventData.budget,
        participants: eventData.participants
    });
    const savedEvent = await newEvent.save();

    const participants = eventData.participants;
    const secretSantaPairs = generateSecretSanta(participants);

    const assignments = secretSantaPairs.map(pair => ({
        event: savedEvent._id,
        giver: pair.giver,
        receiver: pair.receiver,
        revealed: false
    }));

    await AssignmentModel.insertMany(assignments);

    return savedEvent;
};

const generateSecretSanta = (participants: string[]): SecretSantaPair[] => {
    if (participants.length < 3) {
        throw new Error("Il est nécessaire d'avoir au moins trois participants.");
    }

    const givers = [...participants];
    let secretSantaPairs: SecretSantaPair[];

    do {
        const receivers = shuffleReceivers([...participants]);
        secretSantaPairs = givers.map((giver, index) => ({
            giver,
            receiver: receivers[index]
        }));
    } while (secretSantaPairs.some(pair => pair.giver === pair.receiver));

    return secretSantaPairs;
};

const shuffleReceivers = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
};


export const updateEvent = async (eventId: string, eventData: any) => {
    return await EventModel.findByIdAndUpdate(eventId, eventData, { new: true, runValidators: true });
};

export const deleteEvent = async (eventId: string) => {
    await EventModel.findByIdAndDelete(eventId);
    return { message: 'Event deleted successfully' };
};


