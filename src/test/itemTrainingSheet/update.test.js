import update from '../../controllers/itemTrainingSheetController/update.js';
import { updateService } from '../../services/itemTrainingSheet.services.js';

jest.mock('../../services/itemTrainingSheet.services.js');

describe('Update Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return a 200 status code and success message when data is updated', async () => {
        const itemTrainingSheet = {
            _id: 1,
            name: 'Exercise Name',
            series: 3,
            repetition: 12,
            member: 'John Doe',
        };
        const req = {
            itemTrainingSheet,
            body: {
                name: 'Updated Name',
                series: '4',
                repetition: '15',
                member: 'Jane Doe',
            },
        };

        updateService.mockResolvedValue(true);

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Should return a 400 status code and an error message when no fields are provided', async () => {
        const req = {
            body: {},
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('Should return a 500 status code and an error message when an exception occurs', async () => {

        const req = {
            body: {
                name: 'Updated Name',
                series: 4,
                repetition: 15,
                member: 'Jane Doe',
            },
        };

        updateService.mockRejectedValueOnce(new Error('Test Error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await update(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});