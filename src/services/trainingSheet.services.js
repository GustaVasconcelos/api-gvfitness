import trainingSheet from '../models/TrainingSheet.js';

/**
 * Cria uma nova ficha de treinamento com os dados fornecidos.
 * @param {object} body - Dados da ficha de treinamento a serem criados.
 * @returns {Promise<TrainingSheet>} - A ficha de treinamento criada.
 */
const createService = (body) => trainingSheet.create(body);

/**
 * Busca todas as fichas de treinamento.
 * @returns {Promise<TrainingSheet[]>} - Um array de fichas de treinamento.
 */
const findService = () => trainingSheet.find();

/**
 * Encontra uma ficha de treinamento pelo ID.
 * @param {string} id - ID da ficha de treinamento.
 * @returns {Promise<TrainingSheet>} - A ficha de treinamento encontrada.
 */
const findTrainingSheetIdService = (id) => trainingSheet.findById(id);

/**
 * Encontra fichas de treinamento pelo ID do usuário.
 * @param {string} user_id - ID do usuário associado às fichas de treinamento.
 * @returns {Promise<TrainingSheet[]>} - Um array de fichas de treinamento encontradas para o usuário.
 */
const findTrainingSheetUserIdService = (user_id) => trainingSheet.find({ user_id });

/**
 * Atualiza os dados de uma ficha de treinamento.
 * @param {string} id - ID da ficha de treinamento a ser atualizada.
 * @param {string} name - Novo nome da ficha de treinamento.
 * @param {string} updated_at - Nova data de atualização.
 * @returns {Promise<TrainingSheet>} - A ficha de treinamento atualizada.
 */
const updateService = (id, name, updated_at) => {
  return trainingSheet.findByIdAndUpdate(id, { name, updated_at }, { new: true });
};

/**
 * Deleta uma ficha de treinamento pelo ID.
 * @param {string} id - ID da ficha de treinamento a ser deletada.
 * @returns {Promise<TrainingSheet>} - A ficha de treinamento deletada.
 */
const deleteService = (id) => trainingSheet.findByIdAndDelete(id);

export {
    createService,
    findService,
    findTrainingSheetIdService,
    findTrainingSheetUserIdService,
    updateService,
    deleteService
};