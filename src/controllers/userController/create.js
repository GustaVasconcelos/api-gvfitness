import { createService, findCpfService, findEmailService } from "../../services/user.services.js";
import validator from "validator";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
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

        if (!validator.isEmail(email)) {
            return res.status(400).json({ "error": INVALID_EMAIL_MESSAGE });
        }

        if (!cpfValidator.isValid(cpf)) {
            return res.status(400).json({ "error": INVALID_CPF_MESSAGE });
        }

        const cpfIsUnique = await findCpfService(cpf);
        const emailIsUnique = await findEmailService(email);

        if (emailIsUnique) {
            return res.status(400).json({ "error": EMAIL_EXISTS_MESSAGE });
        }

        if (cpfIsUnique) {
            return res.status(400).json({ "error": CPF_EXISTS_MESSAGE });
        }

        await createService(req.body);

        return res.status(201).json({ message: SUCCESS_MESSAGE_CREATE });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default create;