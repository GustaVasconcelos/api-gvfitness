import { validItemTrainingSheet } from '../../middlewares/itemTrainingSheet.middleware.js';
import { findItemTrainingSheetIdService } from '../../services/itemTrainingSheet.services.js';


jest.mock('../../services/itemTrainingSheet.services.js'); 

describe('validItemTrainingSheet Middleware Tests', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should pass when a valid item training sheet is found', async () => {
        const request = {
            params: {
                id: 'valid-item-training-sheet-id',
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const next = jest.fn();

        const itemValidTrainingSheetObject = {
            name: "perna",
            series: "4",
            repetition: "10",
            member: "perna",
            created_at: "10-20-30",
            updated_at: "10-20-30",
        };

        findItemTrainingSheetIdService.mockResolvedValue(itemValidTrainingSheetObject);

        await validItemTrainingSheet(request, response, next);

        expect(findItemTrainingSheetIdService).toHaveBeenCalledWith('valid-item-training-sheet-id');
        expect(request.id).toBe('valid-item-training-sheet-id');
        expect(request.itemTrainingSheet).toBe(itemValidTrainingSheetObject);
        expect(next).toHaveBeenCalled();
    });

    it('should return a 404 error when no item training sheet is found', async () => {
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

        findItemTrainingSheetIdService.mockResolvedValue(null);

        await validItemTrainingSheet(request, response, next);

        expect(findItemTrainingSheetIdService).toHaveBeenCalledWith('non-existent-training-sheet-id');
        expect(response.status).toHaveBeenCalledWith(404);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return a 500 error when an error occurs', async () => {
        const request = {
            params: {
                id: 'valid-item-training-sheet-id',
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const next = jest.fn();

        findItemTrainingSheetIdService.mockRejectedValue(new Error('Mocking exception'));

        await validItemTrainingSheet(request, response, next);

        expect(findItemTrainingSheetIdService).toHaveBeenCalledWith('valid-item-training-sheet-id');
        expect(response.status).toHaveBeenCalledWith(500);
        expect(next).not.toHaveBeenCalled();
    });
});