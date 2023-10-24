import findTrainingSheetUser from "../../controllers/trainingSheetController/findTrainingSheetUser.js";
import { findTrainingSheetUserIdService } from "../../services/trainingSheet.services.js";

jest.mock("../../services/trainingSheet.services.js");

describe("Find Training Sheet by User ID Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return training sheets when found", async () => {
        const request = { id: 123 };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        findTrainingSheetUserIdService.mockResolvedValueOnce(true);

        await findTrainingSheetUser(request, response);

        expect(findTrainingSheetUserIdService).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should return a 500 error when the service fails", async () => {
        const request = { id: 123 };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        findTrainingSheetUserIdService.mockRejectedValueOnce(new Error("Mocking exception"));

        await findTrainingSheetUser(request, response);

        expect(findTrainingSheetUserIdService).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(500);
    });
});