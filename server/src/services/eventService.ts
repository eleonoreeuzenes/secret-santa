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
        event_date: new Date(eventData.event_date), 
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
        receiver: pair.receiver
    }));

    await AssignmentModel.insertMany(assignments);

    return savedEvent;
};

export const updateEvent = async (eventId: string, eventData: any) => {
    return await EventModel.findByIdAndUpdate(eventId, eventData, { new: true, runValidators: true });
};

export const deleteEvent = async (eventId: string) => {
    await EventModel.findByIdAndDelete(eventId);
    return { message: 'Event deleted successfully' };
};

const generateSecretSanta = (participants: string[]): SecretSantaPair[] => {
    if (participants.length < 2) {
        throw new Error("Il doit y avoir au moins deux participants");
    }

    let givers = [...participants];
    let receivers = [...participants];

    function shuffle(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function validPairing(givers: string[], receivers: string[]): boolean {
        for (let i = 0; i < givers.length; i++) {
            if (givers[i] === receivers[i]) {
                return false;
            }
        }
        return true;
    }

    let attempts = 0;
    do {
        receivers = shuffle(receivers);
        attempts++;
    } while (!validPairing(givers, receivers) && attempts < 1000);

    if (attempts === 1000) {
        throw new Error("Impossible de trouver une répartition valide après 1000 tentatives");
    }

    let secretSantaPairs = [];
    for (let i = 0; i < givers.length; i++) {
        secretSantaPairs.push({ giver: givers[i], receiver: receivers[i] });
    }

    return secretSantaPairs;
};
