import destroy from "../../controllers/trainingSheetController/delete.js";
import { deleteService } from "../../services/trainingSheet.services.js";

jest.mock("../../services/trainingSheet.services.js");

describe("Destroy Training Sheet Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should delete a training sheet successfully", async () => {
        const request = {
            id: "training-sheet-id",
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        deleteService.mockResolvedValueOnce();

        await destroy(request, response);

        expect(deleteService).toHaveBeenCalledWith(request.id);
        expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should return a 500 error when deleteService fails", async () => {
        const request = {
            id: "training-sheet-id",
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        deleteService.mockRejectedValueOnce(new Error("Mocking exception"));

        await destroy(request, response);

        expect(deleteService).toHaveBeenCalledWith(request.id);
        expect(response.status).toHaveBeenCalledWith(500);
    });
});