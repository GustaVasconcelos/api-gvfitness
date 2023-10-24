import update from "../../controllers/trainingSheetController/update.js";
import { updateService } from "../../services/trainingSheet.services.js";

jest.mock("../../services/trainingSheet.services.js");

describe("Update Training Sheet Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should update the training sheet when valid data is provided", async () => {
        const request = {
            id: 123,
            body: { name: "New Training Sheet Name" },
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        updateService.mockResolvedValueOnce(true);

        await update(request, response);

        expect(updateService).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should return a 400 error when empty name is provided", async () => {
        const request = {
            id: 123, 
            body: { name: "" },
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await update(request, response);

        expect(updateService).not.toHaveBeenCalled(); 
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return a 500 error when the service fails", async () => {
        const request = {
            id: 123,
            body: { name: "New Training Sheet Name" },
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        updateService.mockRejectedValueOnce(new Error("Mocking exception"));

        await update(request, response);

        expect(updateService).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(500);
    });
});