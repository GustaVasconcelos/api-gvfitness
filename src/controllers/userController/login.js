import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { findCpfService } from '../../services/user.services.js';
import bcrypt from 'bcryptjs';
import { generateTokenUser } from '../../services/auth.services.js';

const EMPTY_FIELDS_MESSAGE = "Há campos vazios!";
const INVALID_CPF_MESSAGE = "CPF inválido!";
const INVALID_CREDENTIALS_MESSAGE = "CPF ou senha inválida";
const SUCCESS_MESSAGE = "Login bem-sucedido";

/**
 * O usuário preenche com seus dados para efetuar o login e recebe um token de autenticação
 */

const login = async (req, res) => {
    const { cpf, password } = req.body;

    if (!cpf || !password) {
        return res.status(400).json({ error: EMPTY_FIELDS_MESSAGE });
    }

    if (!cpfValidator.isValid(cpf)) {
        return res.status(400).json({ error: INVALID_CPF_MESSAGE });
    }

    try {
        const user = await findCpfService(cpf);

        if (!user) {
            return res.status(400).json({ error: INVALID_CREDENTIALS_MESSAGE });
        }

        const passwordIsCorrect = bcrypt.compareSync(password, user.password);

        if (!passwordIsCorrect) {
            return res.status(400).json({ error: INVALID_CREDENTIALS_MESSAGE });
        }

        const token = generateTokenUser(user._id, user.cpf, user.email, user.permission);

        return res.status(200).json({ message: SUCCESS_MESSAGE, token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default login;