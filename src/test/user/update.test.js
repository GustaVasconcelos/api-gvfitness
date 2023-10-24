import update from "../../controllers/userController/update.js";
import { findUserIdService, findEmailService, findCpfService } from "../../services/user.services.js";
import validator from "validator";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

jest.mock("../../services/user.services.js");

describe("Update User Tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should return an error when there are empty fields", async () => {
        const request = {
            body: {
                name: "", 
                email: "",
                cpf: ""
            }
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await update(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
    });

    it("Must return success when editing the user", async () => {
        const request = {
            body: {
                name: "teste", 
                email: "gusta@teste.com",
                cpf: "628.088.863-06"
            }
        }

        findUserIdService.mockResolvedValueOnce(true);

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await update(request, response);

        expect(findUserIdService).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(200);
    });

    test("should check if the email is valid", () => {
        const validEmail = "lucia@teste.com";
    
        const isValidEmail = validator.isEmail(validEmail);
    
        expect(isValidEmail).toBe(true);
    });

    test("should check if the email is not valid", () => {
        const validEmail = "invalid-email";
    
        const isValidEmail = validator.isEmail(validEmail);
    
        expect(isValidEmail).toBe(false);
    });

    test("must return an error when email already exists in the database", async () => {
        const request = {
            body: {
                name: "Lucia",
                email: "existing@teste.com",
                cpf: "901.338.624-53",
            }
        }
    
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        findEmailService.mockResolvedValueOnce(true);
    
        await update(request, response);
    
        expect(findEmailService).toHaveBeenCalledWith(request.body.email);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    test("must return an error when cpf already exists in the database", async () => {
        const request = {
            body: {
                name: "Lucia",
                email: "lucia@teste.com",
                cpf: "901.338.624-53",
            }
        }
    
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        findCpfService.mockResolvedValueOnce(true);
    
        await update(request, response);
    
        expect(findCpfService).toHaveBeenCalledWith(request.body.cpf);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    test("should return an internal error", async () => {
        const request = {
            body: {
                name: "Lucia",
                email: "lucia@teste.com",
                cpf: "901.338.624-53",
            }
        }
    
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        findCpfService.mockRejectedValue(new Error("Mocking exception"));
    
        await update(request, response);
    
        expect(findCpfService).toHaveBeenCalledWith(request.body.cpf);
        expect(response.status).toHaveBeenCalledWith(500);
    });
});