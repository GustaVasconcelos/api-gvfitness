import validator from "validator";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { findUserIdService, findCpfService, findEmailService, updateUserService } from "../../services/user.services.js";

const INVALID_FIELD_MESSAGE = "Edite pelo menos um campo";
const INVALID_EMAIL_MESSAGE = "Email inválido!";
const INVALID_CPF_MESSAGE = "CPF inválido!";
const EMAIL_EXISTS_MESSAGE = "Email já cadastrado!";
const CPF_EXISTS_MESSAGE = "CPF já cadastrado!";
const SUCCESS_MESSAGE = "Dados alterados!";

const update = async (req, res) => {
    try {
        const user = await findUserIdService(req.userId);
        const { name, email, cpf } = req.body;

        if (!name && !email && !cpf) {
            return res.status(400).json({ "error": INVALID_FIELD_MESSAGE });
        }

        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ "error": INVALID_EMAIL_MESSAGE });
        }

        if (cpf && !cpfValidator.isValid(cpf)) {
            return res.status(400).json({ "error": INVALID_CPF_MESSAGE });
        }

        if (email) {
            const emailIsUnique = await findEmailService(email);
            if (emailIsUnique) {
                return res.status(400).json({ "error": EMAIL_EXISTS_MESSAGE });
            }
        }

        if (cpf) {
            const cpfIsUnique = await findCpfService(cpf);
            if (cpfIsUnique) {
                return res.status(400).json({ "error": CPF_EXISTS_MESSAGE });
            }
        }

        const updatedName = name || user.name;
        const updatedEmail = email || user.email;
        const updatedCpf = cpf || user.cpf;

        await updateUserService(user.id, updatedName, updatedEmail, updatedCpf);

        return res.status(200).json({ "message": SUCCESS_MESSAGE });
    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
};

export default update;