import itemTrainingSheet from '../models/ItemTrainingSheet.js';

const findItemTrainingSheetIdService = (id) => itemTrainingSheet.findById(id);
const findService = () => itemTrainingSheet.find();
const createService = (body) => itemTrainingSheet.create(body);
const deleteService = (id) => itemTrainingSheet.findByIdAndDelete(id);
const findAllItemsTrainingSheetService = (trainingSheetId) => itemTrainingSheet.find({trainingSheetId});
const updateService = (id, name, series, repetitions, member) => itemTrainingSheet.findByIdAndUpdate(id, {name, series, repetitions, member}, {new:true});

export {
    createService,
    findService,
    deleteService,
    findAllItemsTrainingSheetService,
    updateService,
    findItemTrainingSheetIdService
}