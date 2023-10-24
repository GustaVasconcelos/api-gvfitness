import login from '../../controllers/userController/login.js';
import { findCpfService } from '../../services/user.services.js';
import { generateTokenUser } from '../../services/auth.services.js';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import bcrypt from 'bcryptjs';

jest.mock('../../services/user.services.js');
jest.mock('../../services/auth.services.js');

describe("Login User Tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Should return an error when there are empty fields", async () => {
        const request = {
            body: {
                cpf: "",
                password: "",
            }
        }

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await login(request, response);

        expect(findCpfService).not.toHaveBeenCalled();
        expect(generateTokenUser).not.toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(400);
    });

    test("should check if the cpf is valid", () => {
        const validCpf = "901.338.624-53";
    
        const isValidCpf = cpfValidator.isValid(validCpf);
    
        expect(isValidCpf).toBe(true);
    });

    test("must return an error when cpf not exists in the database", async () => {
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

        findCpfService.mockResolvedValueOnce(false);
    
        await login(request, response);
    
        expect(findCpfService).toHaveBeenCalledWith(request.body.cpf);
        expect(response.status).toHaveBeenCalledWith(400);
    });

    test("should return success if the passwords are identical", () => {
        const password = "123456";
        const passwordUser = "$2b$10$4ThTN9uqAaxW0JXMCWheLehr8HBpN9vYv4YAE9v5sK1NgBAr0kvf2";
    
        const passwordIsCorrect = bcrypt.compareSync(password, passwordUser);
        
        expect(passwordIsCorrect).toBe(true);
    });

    test("should return failed if passwords are not identical", () => {
        const password = "1234567";
        const passwordUser = "$2b$10$4ThTN9uqAaxW0JXMCWheLehr8HBpN9vYv4YAE9v5sK1NgBAr0kvf2";
    
        const passwordIsCorrect = bcrypt.compareSync(password, passwordUser);
        
        expect(passwordIsCorrect).toBe(false);
    });

    test("must generate a token", async () => {
        const request = {
            body: {
                cpf: "901.338.624-53",
                password: "test1"
            }
        }
    
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    
        findCpfService.mockResolvedValueOnce(true);

        await login(request, response);
    
        expect(findCpfService).toHaveBeenCalledTimes(1);
        expect(bcrypt.compareSync).toHaveBeenCalledTimes(1);
        expect(generateTokenUser).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(200);
    });

    test("Should return a 500 error", async () => {
        const request = {
            body: {
                cpf: "901.338.624-53",
                password: "test1"
            }
        }
    
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    
        findCpfService.mockRejectedValue(new Error("Mocking exception"));

        await login(request, response);
    
        expect(findCpfService).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(500);
    });
});