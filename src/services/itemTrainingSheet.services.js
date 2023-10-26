import itemTrainingSheet from '../models/ItemTrainingSheet.js';

/**
 * Encontra um item de ficha de treinamento pelo ID.
 * @param {string} id - ID do item de ficha de treinamento.
 * @returns {Promise<ItemTrainingSheet>} - O item de ficha de treinamento encontrado.
 */
const findItemTrainingSheetIdService = (id) => itemTrainingSheet.findById(id);

/**
 * Busca todos os itens de ficha de treinamento.
 * @returns {Promise<ItemTrainingSheet[]>} - Um array de itens de ficha de treinamento.
 */
const findService = () => itemTrainingSheet.find();

/**
 * Cria um novo item de ficha de treinamento com os dados fornecidos.
 * @param {object} body - Dados do item de ficha de treinamento a serem criados.
 * @returns {Promise<ItemTrainingSheet>} - O item de ficha de treinamento criado.
 */
const createService = (body) => itemTrainingSheet.create(body);

/**
 * Deleta um item de ficha de treinamento pelo ID.
 * @param {string} id - ID do item de ficha de treinamento a ser deletado.
 * @returns {Promise<ItemTrainingSheet>} - O item de ficha de treinamento deletado.
 */
const deleteService = (id) => itemTrainingSheet.findByIdAndDelete(id);

/**
 * Busca todos os itens de ficha de treinamento relacionados a uma ficha de treinamento específica.
 * @param {string} trainingSheetId - ID da ficha de treinamento associada aos itens.
 * @returns {Promise<ItemTrainingSheet[]>} - Um array de itens de ficha de treinamento relacionados à ficha de treinamento.
 */
const findAllItemsTrainingSheetService = (trainingSheetId) => itemTrainingSheet.find({ trainingSheetId });

/**
 * Atualiza os dados de um item de ficha de treinamento.
 * @param {string} id - ID do item de ficha de treinamento a ser atualizado.
 * @param {string} name - Novo nome do item.
 * @param {string} series - Novo número de séries do item.
 * @param {string} repetitions - Novo número de repetições do item.
 * @param {string} member - Novo membro associado ao item.
 * @returns {Promise<ItemTrainingSheet>} - O item de ficha de treinamento atualizado.
 */
const updateService = (id, name, series, repetitions, member) => {
    return itemTrainingSheet.findByIdAndUpdate(id, { name, series, repetitions, member }, { new: true });
};

export {
    createService,
    findService,
    deleteService,
    findAllItemsTrainingSheetService,
    updateService,
    findItemTrainingSheetIdService
};