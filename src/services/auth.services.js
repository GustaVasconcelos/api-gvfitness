import jwt from 'jsonwebtoken'

/**
 * Gera um token JWT com os dados do usuário.
 * @param {string} id - ID do usuário.
 * @param {string} cpf - CPF do usuário.
 * @param {string} email - Email do usuário.
 * @param {string} permission - Permissão do usuário.
 * @returns {string} - O token JWT gerado.
 */
const generateTokenUser = (id, name, cpf, email, permission) => jwt.sign({
    id,
    name,
    cpf,
    email,
    permission
}, process.env.SECRET_JWT, {
    expiresIn: 604800
});

export {
    generateTokenUser
}