import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { findCpfService } from '../services/user.services.js';
import { INVALID_CPF_MESSAGE, CPF_EXISTS_MESSAGE } from '../messages/messages.js';


const validCpf = (req, res, next) => {
    const cpf = req.body.cpf

    if(cpf && !cpfValidator.isValid(cpf)) {
        return res.status(400).json({ 'error': INVALID_CPF_MESSAGE });
    }

    next();
}

const cpfExistsInDb = async (req, res, next) => {
    const cpf = req.body.cpf
    const cpfIsUnique = await findCpfService(cpf);

    if (cpf && cpfIsUnique) {
        return res.status(400).json({ "error": CPF_EXISTS_MESSAGE });
    }

    next()
}


export {
    validCpf,
    cpfExistsInDb
}