import { createService } from "../../services/user.services.js";
import validator from "validator";
import { EMPTY_FIELDS_MESSAGE, PASSWORD_MISMATCH_MESSAGE, INVALID_CPF_MESSAGE, INVALID_EMAIL_MESSAGE, EMAIL_EXISTS_MESSAGE, CPF_EXISTS_MESSAGE, SUCCESS_MESSAGE_CREATE } from "../../messages/messages.js";

/**
 * Registra o usuário.
 */

const create = async (req, res) => {
    try {
        const { name, email, cpf, password, confirmPassword } = req.body;

        if (!name || !email || !cpf || !password || !confirmPassword) {
            return res.status(400).json({ "error": EMPTY_FIELDS_MESSAGE });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ "error": PASSWORD_MISMATCH_MESSAGE });
        }

        await createService(req.body);

        return res.status(201).json({ message: SUCCESS_MESSAGE_CREATE });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default create;