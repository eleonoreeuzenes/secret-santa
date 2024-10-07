import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../services/eventService'; 
import EventModel from '../models/event';
import AssignmentModel from '../models/assignment';

jest.mock('../models/event');
jest.mock('../models/assignment'); 

describe('Event Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    describe('getAllEvents', () => {
        it('should return all events', async () => {
            const mockEvents = [{ _id: '1', name: 'Christmas Party' }];
            (EventModel.find as jest.Mock).mockResolvedValue(mockEvents); 
            
            const events = await getAllEvents();
            expect(events).toEqual(mockEvents);
        });
    });

    describe('getEventById', () => {
        it('should return a single event by id', async () => {
            const mockEvent = { _id: '1', name: 'Christmas Party' };
            (EventModel.findById as jest.Mock).mockResolvedValue(mockEvent); 
            
            const event = await getEventById('1');
            expect(event).toEqual(mockEvent);
        });
    });

    describe('createEvent', () => {
        it('should create a new event and assign secret santa pairs', async () => {
            const mockEventData = {
                organizer: 'Alice',
                event_name: 'Christmas Party',
                event_date: '2024-12-25',
                event_location: 'Alice\'s House',
                budget: 20,
                participants: ['Alice', 'Bob', 'Charlie']
            };

            const mockSavedEvent = { _id: '1', ...mockEventData };
            (EventModel.prototype.save as jest.Mock).mockResolvedValue(mockSavedEvent); 
            (AssignmentModel.insertMany as jest.Mock).mockResolvedValue([]); 
            
            const savedEvent = await createEvent(mockEventData);
            expect(savedEvent).toEqual(mockSavedEvent);

            const expectedAssignments = [
                { event: '1', giver: expect.any(String), receiver: expect.any(String) },
                { event: '1', giver: expect.any(String), receiver: expect.any(String) },
                { event: '1', giver: expect.any(String), receiver: expect.any(String) }
            ];
    
            expect(AssignmentModel.insertMany).toHaveBeenCalledWith(expect.arrayContaining(expectedAssignments));
    
            const assignments = (AssignmentModel.insertMany as jest.Mock).mock.calls[0][0];
            assignments.forEach((assignment: { giver: string, receiver: string }) => {
                expect(assignment.giver).not.toBe(assignment.receiver);
            });
        });
    
        it('should throw an error if there are not enough participants', async () => {
            const mockEventData = {
                organizer: 'Alice',
                event_name: 'Christmas Party',
                event_date: '2024-12-25',
                event_location: 'Alice\'s House',
                budget: 20,
                participants: ['Alice', 'Bob'] 
            };
    
            await expect(createEvent(mockEventData)).rejects.toThrow("Il est nécessaire d'avoir au moins trois participants.");
        });

    });

    describe('updateEvent', () => {
        it('should update an existing event', async () => {
            const mockEventData = { event_name: 'Updated Christmas Party' };
            const mockUpdatedEvent = { _id: '1', ...mockEventData };
            (EventModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedEvent); 
            
            const event = await updateEvent('1', mockEventData);
            expect(event).toEqual(mockUpdatedEvent);
        });
    });

    describe('deleteEvent', () => {
        it('should delete an event by id', async () => {
            (EventModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null); 
            
            const response = await deleteEvent('1');
            expect(response).toEqual({ message: 'Event deleted successfully' });
        });
    });
});
