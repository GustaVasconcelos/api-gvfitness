import { findService } from "../../services/user.services.js";
import { NO_ITEMS_MESSAGE, } from "../../messages/messages.js";

/**
 * Retorna todos os usuários cadastrados no banco.
 */
const find = async (req, res) => {
    try {
        const users = await findService();

        if (users.length === 0) {
            return res.status(404).json({ "error": NO_ITEMS_MESSAGE });
        }

        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default find;