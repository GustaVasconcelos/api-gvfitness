import trainingSheet from '../models/TrainingSheet.js';

const findService = () => trainingSheet.find();
const findTrainingSheetIdService = (id) => trainingSheet.findById(id);
const findTrainingSheetUserIdService = (user_id) => trainingSheet.find({user_id});
const createService = (body) => trainingSheet.create(body);
const updateService = (id, name, updated_at) => trainingSheet.findByIdAndUpdate(id, {name, updated_at}, {new:true});
const deleteService = (id) => trainingSheet.findByIdAndDelete(id);

export {
    createService,
    findService,
    findTrainingSheetIdService,
    findTrainingSheetUserIdService,
    updateService,
    deleteService,
}