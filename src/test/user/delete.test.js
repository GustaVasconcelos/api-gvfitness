import destroy from "../../controllers/userController/delete.js";
import { deleteUserService } from "../../services/user.services.js";

jest.mock("../../services/user.services.js");

describe("Delete user tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return success when delete user in the db", async() =>{
        const request = {
            id:1
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        deleteUserService.mockResolvedValueOnce(true);

        await destroy(request, response);

        expect(deleteUserService).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should return an error status 500 when delete user in the db", async() =>{
        const request = {
            id:1
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        deleteUserService.mockRejectedValue(new Error("Mocking exception"));

        await destroy(request, response);

        expect(deleteUserService).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(500);
    });

    it("should return an error for not having an id passed", async() =>{
        const request = {
            id:""
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await destroy(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
    });
})