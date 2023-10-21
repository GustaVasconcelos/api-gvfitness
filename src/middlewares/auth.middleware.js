import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { findUserIdService } from '../services/user.services.js';

dotenv.config();

const UNAUTHORIZED_MESSAGE = 'Usuário não autorizado!';
const INVALID_TOKEN_MESSAGE = 'Token inválido!';

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: UNAUTHORIZED_MESSAGE });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        const user = await findUserIdService(decoded.id);

        if (!user || !user._id) {
            return res.status(401).json({ error: INVALID_TOKEN_MESSAGE });
        }

        req.userId = decoded.id;
        req.userPermission = decoded.permission.toString();

        next();
    } catch (err) {
        return res.status(401).json({ error: INVALID_TOKEN_MESSAGE });
    }
};

export { authMiddleware };