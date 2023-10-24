import create from '../../controllers/itemTrainingSheetController/create';
import { createService } from '../../services/itemTrainingSheet.services';

jest.mock('../../services/itemTrainingSheet.services');

describe('Create Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return a 201 status code and success message when data is created', async () => {

        const req = {
            id: 1, 
            body: {
                name: 'Exercise Name',
                series: 3,
                repetition: 12,
                member: 'John Doe',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        createService.mockResolvedValueOnce();

        await create(req, res);

        expect(createService).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it('Should return a 400 status code and an error message when fields are missing', async () => {
        const req = {
            id: 1, 
            body: {
                
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('Should return a 500 status code and an error message when an exception occurs', async () => {
        const req = {
            id: 1, 
            body: {
                name: 'Exercise Name',
                series: 3,
                repetition: 12,
                member: 'John Doe',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        createService.mockRejectedValueOnce(new Error('Test Error'));

        await create(req, res);

        expect(createService).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});