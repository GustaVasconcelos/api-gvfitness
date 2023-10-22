import find from '../../controllers/userController/find.js';
import { findService } from "../../services/user.services.js";

jest.mock("../../services/user.services.js");

describe("Find users test", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return success when searching for users in the db", async() =>{
        const request = {}

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        findService.mockResolvedValueOnce(true);

        await find(request, response);

        expect(findService).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should return an error when searching for users in the db", async() =>{
        const request = {}

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        findService.mockRejectedValue(new Error("Mocking exception"));;
        
        await find(request, response);

        expect(findService).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(500);
    });

    it("Should return a 404 error when there are no users", async() =>{
        const request = {}

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        findService.mockResolvedValue([]);
        
        await find(request, response);

        expect(findService).toHaveBeenCalledTimes(1)
        expect(response.status).toHaveBeenCalledWith(404);
    });
    
});