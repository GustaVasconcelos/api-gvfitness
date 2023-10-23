import { authMiddleware } from '../../middlewares/auth.middleware.js';
import jwt from 'jsonwebtoken';
import { findUserIdService } from '../../services/user.services.js';

jest.mock("../../services/user.services.js");

describe('Authentication Middleware Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a 401 error when no authorization header is provided', async () => {
        const request = {
            headers: {},
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await authMiddleware(request, response, jest.fn());

        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: 'Usuário não autorizado!' });
    });

    it('should return a 401 error when an invalid token is provided', async () => {
        const request = {
            headers: {
                authorization: 'Bearer invalid-token',
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jwt.verify = jest.fn(() => {
            throw new Error('Invalid token');
        });

        await authMiddleware(request, response, jest.fn());

        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: 'Token inválido!' });
    });

    it('should return a 401 error when the user is not found', async () => {
        const request = {
            headers: {
                authorization: 'Bearer valid-token',
            }
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jwt.verify = jest.fn(() => {
            return { id: 'valid-user-id' };
        });

        findUserIdService.mockResolvedValueOnce(null);

        await authMiddleware(request, response, jest.fn());

        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: 'Token inválido!' });
    });

    it('should set userId and userPermission in the request when a valid token and user are found', async () => {
        const request = {
            headers: {
                authorization: 'Bearer valid-token',
            }
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jwt.verify = jest.fn(() => {
            return { id: 'valid-user-id', permission: 'user-permission' };
        });

        findUserIdService.mockResolvedValueOnce({ _id: 'valid-user-id' });

        const next = jest.fn();

        await authMiddleware(request, response, next);

        expect(response.status).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(request.userId).toEqual('valid-user-id');
        expect(request.userPermission).toEqual('user-permission');
    });
});