import create from '../../controllers/userController/create.js';
import { createService, findEmailService, findCpfService } from '../../services/user.services.js';
import validator from "validator";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

jest.mock('../../services/user.services.js');

describe("Create User Tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Should return an error when there are empty fields", async () => {
        const request = {
            body: {
                name: "", 
                email: "test@example.com",
                cpf: "123.456.789-01",
                password: "test123",
                confirmPassword: "test123"
            }
        }
    
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        await create(request, response);
    
        expect(findEmailService).not.toHaveBeenCalled();
        expect(findCpfService).not.toHaveBeenCalled();
        expect(createService).not.toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(400);
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
                password: "test1",
                confirmPassword: "test1"
            }
        }
    
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        findEmailService.mockResolvedValueOnce(true);
    
        await create(request, response);
    
        expect(findEmailService).toHaveBeenCalledWith(request.body.email);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    test("must return an error when cpf already exists in the database", async () => {
        const request = {
            body: {
                name: "Lucia",
                email: "lucia@teste.com",
                cpf: "901.338.624-53",
                password: "test1",
                confirmPassword: "test1"
            }
        }
    
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        findCpfService.mockResolvedValueOnce(true);
    
        await create(request, response);
    
        expect(findCpfService).toHaveBeenCalledWith(request.body.cpf);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    test("should check if the cpf is valid", () => {
        const validCpf = "901.338.624-53";
    
        const isValidCpf = cpfValidator.isValid(validCpf);
    
        expect(isValidCpf).toBe(true);
    });

    test("should return an error if passwords are different", () => {
        const validCpf = "901.338.624-53";
    
        const isValidCpf = cpfValidator.isValid(validCpf);
    
        expect(isValidCpf).toBe(true);
    });

    test("must return an error when passwords do not match", async () => {
        const request = {
            body: {
                name: "Lucia",
                email: "lucia@teste.com",
                cpf: "901.338.624-53",
                password: "test1", 
                confirmPassword: "test2" 
            }
        }
    
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        await create(request, response);
    
        expect(createService).not.toHaveBeenCalled(); 
        expect(response.status).toHaveBeenCalledWith(400);
    });

    test("must register the user in the database successfully", async () => {
        const request = {
            body: {
                name: "Lucia",
                email: "lucia@teste.com",
                cpf: "901.338.624-53",
                password: "teste",
                confirmPassword: "teste"
            }
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        
        await create(request, response);

        expect(createService).toHaveBeenCalledTimes(1);
        expect(createService).toHaveBeenCalledWith(request.body);
        expect(response.status).toHaveBeenCalledWith(201);
    })

    test("It should return an error when not registering the user", async () => {
        const request = {
            body: {
                name: "Lucia",
                email: "lucia@teste.com",
                cpf: "901.338.624-53",
                password: "teste",
                confirmPassword: "teste"
            }
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        createService.mockRejectedValue(new Error("Mocking exception"))

        await create(request, response);

        expect(createService).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(500);
    })

});