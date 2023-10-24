import create from '../../controllers/itemTrainingSheetController/create.js';
import { createService } from '../../services/itemTrainingSheet.services.js';

jest.mock('../../services/itemTrainingSheet.services.js');

describe('Create Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return a 201 status code and success message when data is created', async () => {
        const request = {
            id: 1, 
            body: {
                name: 'Exercise Name',
                series: 3,
                repetition: 12,
                member: 'John Doe',
            },
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        createService.mockResolvedValueOnce();

        await create(request, response);

        expect(response.status).toHaveBeenCalledWith(201);
    });

    it('Should return a 400 status code and an error message when fields are missing', async () => {
        const request = {
            id: 1, 
            body: {
            },
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await create(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
    });

    it('Should return a 500 status code and an error message when an exception occurs', async () => {
        const request = {
            id: 1,
            body: {
                name: 'Exercise Name',
                series: 3,
                repetition: 12,
                member: 'John Doe',
            },
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        createService.mockRejectedValueOnce(new Error('Test Error'));

        await create(request, response);

        expect(createService).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(500);
    });
});