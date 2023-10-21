import User from '../models/User.js';

/**
 * Cria um novo usuário com os dados fornecidos.
 * @param {object} body - Dados do usuário a serem criados.
 * @returns {Promise<User>} - O usuário criado.
 */
const createService = (body) => User.create(body);

/**
 * Busca todos os usuários.
 * @returns {Promise<User[]>} - Um array de usuários.
 */
const findService = () => User.find();

/**
 * Encontra um usuário pelo CPF e retorna os dados, incluindo a senha.
 * @param {string} cpf - CPF do usuário.
 * @returns {Promise<User>} - O usuário encontrado.
 */
const findCpfService = (cpf) => User.findOne({ cpf }).select('+password');

/**
 * Encontra um usuário pelo email.
 * @param {string} email - Email do usuário.
 * @returns {Promise<User>} - O usuário encontrado.
 */
const findEmailService = (email) => User.findOne({ email });

/**
 * Encontra um usuário pelo ID.
 * @param {string} id - ID do usuário.
 * @returns {Promise<User>} - O usuário encontrado.
 */
const findUserIdService = (id) => User.findById(id);

/**
 * Atualiza os dados de um usuário.
 * @param {string} id - ID do usuário a ser atualizado.
 * @param {string} name - Novo nome do usuário.
 * @param {string} email - Novo email do usuário.
 * @param {string} cpf - Novo CPF do usuário.
 * @returns {Promise<User>} - O usuário atualizado.
 */
const updateUserService = (id, name, email, cpf) => {
  return User.findByIdAndUpdate(id, { name, email, cpf }, { new: true });
};

/**
 * Atualiza os dados de um usuário.
 * @param {string} id - ID do usuário a ser deletado.
 * @returns {Promise<User>} - O usuário deletado.
 */
const deleteUserService = (id) => User.findByIdAndDelete(id);

export {
  createService,
  findService,
  findCpfService,
  findEmailService,
  findUserIdService,
  updateUserService,
  deleteUserService
};