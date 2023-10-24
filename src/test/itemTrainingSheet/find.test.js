import find from '../../controllers/itemTrainingSheetController/find';
import { findService } from '../../services/itemTrainingSheet.services';

jest.mock('../../services/itemTrainingSheet.services'); 

describe('Find Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('Should return a 200 status code and itemsTrainingSheet when data is found', async () => {

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        findService.mockResolvedValueOnce(true);

        await find(req, res);

        expect(findService).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Should return a 404 status code and an error message when no data is found', async () => {

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        findService.mockResolvedValueOnce([]);

        await find(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    it('Should return a 500 status code and an error message when an exception occurs', async () => {

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        findService.mockRejectedValueOnce(new Error('Test Error'));

        await find(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});