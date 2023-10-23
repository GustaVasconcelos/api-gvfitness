import { validId } from '../../middlewares/user.middleware.js';
import mongoose from 'mongoose';

jest.mock("../../middlewares/user.middleware.js");

describe('Valid ID Middleware Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call next() when a valid ID is provided', () => {
        const request = {
            params: {
                id: 'valid-object-id',
            },
        };

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);

        const next = jest.fn();

        validId(request, response, next);

        expect(next).not.toHaveBeenCalled();
        expect(response.status).not.toHaveBeenCalled();
    });

    it('should return a invalid-id when an invalid ID is provided', () => {
        const request = {
            params: {
                id: 'invalid-id',
            },
        };

        const response = {
            status: jest.fn(() => response),
            json: jest.fn(),
        };

        mongoose.isValidObjectId(request.params.id);

        const next = jest.fn();

        validId(request, response, next);

        expect(mongoose.isValidObjectId).toHaveBeenCalledWith('invalid-id');
    });

});