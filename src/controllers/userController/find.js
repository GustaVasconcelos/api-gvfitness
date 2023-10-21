import { findService } from "../../services/user.services.js";

const NO_USERS_MESSAGE = "Não possui usuários cadastrados";
const SUCCESS_MESSAGE = "Usuários encontrados";
/**
 * Retorna todos os usuários cadastrados no banco.
 */
const find = async (req, res) => {
    try {
        const users = await findService();

        if (users.length === 0) {
            return res.status(404).json({ "error": NO_USERS_MESSAGE });
        }

        return res.status(200).json({ message: SUCCESS_MESSAGE, users });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default find;