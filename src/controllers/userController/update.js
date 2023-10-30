import validator from "validator";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { findUserIdService, findCpfService, findEmailService, updateUserService } from "../../services/user.services.js";
import { INVALID_CPF_MESSAGE, INVALID_EMAIL_MESSAGE, CPF_EXISTS_MESSAGE, EMAIL_EXISTS_MESSAGE, SUCCESS_MESSAGE_UPDATE, INVALID_FIELD_MESSAGE } from "../../messages/messages.js";

const update = async (req, res) => {
    try {
        const user = await findUserIdService(req.userId);
        const { name, email, cpf } = req.body;

        if (!name && !email && !cpf) {
            return res.status(400).json({ "error": INVALID_FIELD_MESSAGE });
        }

        const updatedName = name || user.name;
        const updatedEmail = email || user.email;
        const updatedCpf = cpf || user.cpf;

        await updateUserService(user.id, updatedName, updatedEmail, updatedCpf);

        return res.status(200).json({ "message": SUCCESS_MESSAGE_UPDATE });
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

export default update;