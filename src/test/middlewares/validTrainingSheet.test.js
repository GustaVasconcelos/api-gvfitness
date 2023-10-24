import { validTrainingSheet } from '../../middlewares/trainingSheet.middleware.js';
import { findTrainingSheetIdService } from '../../services/trainingSheet.services.js';

jest.mock('../../services/trainingSheet.services.js'); 

describe('validTrainingSheet Middleware Tests', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should pass when a valid training sheet is found', async () => {
        const request = {
            params: {
                id: 'valid-training-sheet-id',
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const next = jest.fn();

        const validTrainingSheetObject = {
            name: "Lucia",
            user_id: "24252",
            created_at: "10-20-30",
            updated_at: "10-20-30",
        };
        findTrainingSheetIdService.mockResolvedValue(validTrainingSheetObject);

        await validTrainingSheet(request, response, next);

        expect(findTrainingSheetIdService).toHaveBeenCalledWith('valid-training-sheet-id');
        expect(request.id).toBe('valid-training-sheet-id');
        expect(request.trainingSheet).toBe(validTrainingSheetObject);
        expect(next).toHaveBeenCalled();
    });

    it('should return a 404 error when no training sheet is found', async () => {
        const request = {
            params: {
                id: 'non-existent-training-sheet-id',
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const next = jest.fn();

        findTrainingSheetIdService.mockResolvedValue(null);

        await validTrainingSheet(request, response, next);

        expect(findTrainingSheetIdService).toHaveBeenCalledWith('non-existent-training-sheet-id');
        expect(response.status).toHaveBeenCalledWith(404);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return a 500 error when an error occurs', async () => {
        const request = {
            params: {
                id: 'valid-training-sheet-id',
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const next = jest.fn();

        findTrainingSheetIdService.mockRejectedValue(new Error('Mocking exception'));

        await validTrainingSheet(request, response, next);

        expect(findTrainingSheetIdService).toHaveBeenCalledWith('valid-training-sheet-id');
        expect(response.status).toHaveBeenCalledWith(500);
        expect(next).not.toHaveBeenCalled();
    });
});