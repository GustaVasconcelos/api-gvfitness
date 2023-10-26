import mongoose from 'mongoose';
import { findUserIdService } from '../services/user.services.js';
import { INVALID_ID_MESSAGE, USER_NOT_FOUND_MESSAGE } from '../messages/messages.js';



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
            return res.status(404).json({ error: USER_NOT_FOUND_MESSAGE});
        }

        req.id = id;
        req.user = user;

        next();
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export { validId, validUser };