import { validUser } from '../../middlewares/user.middleware.js';
import { findUserIdService } from '../../services/user.services.js';

jest.mock('../../services/user.services.js'); 

describe('validUser Middleware Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should pass when a valid user is found', async () => {
        const request = {
            params: {
                id: 'valid-user-id',
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const next = jest.fn();

        const validUserObject = {
            name: "Lucia",
            email: "lucia@teste.com",
            cpf: "901.338.624-53",
            password: "teste",
        };
        findUserIdService.mockResolvedValue(validUserObject);

        await validUser(request, response, next);

        expect(findUserIdService).toHaveBeenCalledWith('valid-user-id');
        expect(request.id).toBe('valid-user-id');
        expect(request.user).toBe(validUserObject);
        expect(next).toHaveBeenCalled();
    });

    it('should return a 404 error when no user is found', async () => {
        const request = {
            params: {
                id: 'non-existent-user-id',
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const next = jest.fn();

        findUserIdService.mockResolvedValue(null);

        await validUser(request, response, next);

        expect(findUserIdService).toHaveBeenCalledWith('non-existent-user-id');
        expect(response.status).toHaveBeenCalledWith(404);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return a 500 error when an error occurs', async () => {
        const request = {
            params: {
                id: 'valid-user-id',
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const next = jest.fn();

        findUserIdService.mockRejectedValue(new Error('Mocking exception'));

        await validUser(request, response, next);

        expect(findUserIdService).toHaveBeenCalledWith('valid-user-id');
        expect(response.status).toHaveBeenCalledWith(500);
        expect(next).not.toHaveBeenCalled();
    });
});