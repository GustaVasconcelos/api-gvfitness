import find from '../../controllers/trainingSheetController/find';
import { findService } from '../../services/trainingSheet.services';

jest.mock('../../services/trainingSheet.services');

describe('Find Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return a 200 status code and the training sheets when data is found', async () => {
        findService.mockResolvedValueOnce(true);

        const request = {};
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await find(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
    });

    it('Should return a 404 status code and an error message when no data is found', async () => {

        const request = {};
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        findService.mockResolvedValueOnce(null);

        await find(request, response);

        expect(response.status).toHaveBeenCalledWith(404);
    });

    it('should return a 500 error when find service fails', async () => {
        const request = {};
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        findService.mockRejectedValueOnce(new Error("Mocking exception"));
    
        await find(request, response);
    
        expect(findService).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(500);
    });
});