import mongoose from 'mongoose';
import { findUserIdService } from '../services/user.services.js';

const INVALID_ID_MESSAGE = 'Id inválido!';
const USER_NOT_FOUND_MESSAGE = 'Usuário não foi encontrado';

const validId = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ error: INVALID_ID_MESSAGE });
    }

    next();
};

const validUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await findUserIdService(id);

        if (!user) {
            return res.status(404).json({ error: USER_NOT_FOUND_MESSAGE });
        }

        req.id = id;
        req.user = user;

        next();
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export { validId, validUser };