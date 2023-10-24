import create from "../../controllers/trainingSheetController/create.js";
import { createService } from "../../services/trainingSheet.services.js";

jest.mock("../../services/trainingSheet.services.js"); // Mock o módulo createService

describe("Create Training Sheet Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a training sheet successfully", async () => {
        const request = {
            id: "user_id",
            body: {
                name: "Training Sheet Name",
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        createService.mockResolvedValueOnce();

        await create(request, response);

        expect(createService).toHaveBeenCalledWith({ name: request.body.name, user_id: request.id });
        expect(response.status).toHaveBeenCalledWith(201);
    });

    it("should return a 400 error when name is empty", async () => {
        const request = {
            id: "user_id",
            body: {
                name: "", 
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await create(request, response);

        expect(createService).not.toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return a 500 error when createService fails", async () => {
        const request = {
            id: "user_id", 
            body: {
                name: "Training Sheet Name",
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        createService.mockRejectedValueOnce(new Error("Mocking exception")); 

        await create(request, response);

        expect(createService).toHaveBeenCalledWith({ name: request.body.name, user_id: request.id });
        expect(response.status).toHaveBeenCalledWith(500);
    });
});