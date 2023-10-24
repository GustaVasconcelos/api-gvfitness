import findAllItemsTrainingSheet from '../../controllers/itemTrainingSheetController/findAllItemsTrainingSheet.js';
import { findAllItemsTrainingSheetService } from '../../services/itemTrainingSheet.services';

jest.mock('../../services/itemTrainingSheet.services'); 

describe('Find All Items Training Sheet Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return a 200 status code and itemsTrainingSheet when data is found', async () => {
        const trainingSheetid = 1; 

        const req = {
            id: trainingSheetid,
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        findAllItemsTrainingSheetService.mockResolvedValueOnce(true);

        await findAllItemsTrainingSheet(req, res);

        expect(findAllItemsTrainingSheetService).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Should return a 500 status code and an error message when an exception occurs', async () => {
        const trainingSheetid = 1; 

        const req = {
            id: trainingSheetid,
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        
        findAllItemsTrainingSheetService.mockRejectedValueOnce(new Error('Test Error'));

        await findAllItemsTrainingSheet(req, res);

        expect(findAllItemsTrainingSheetService).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});