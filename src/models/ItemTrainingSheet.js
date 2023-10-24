import mongoose from 'mongoose';

const itemTrainingSheetSchema = new mongoose.Schema({
    trainingSheetId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"trainingSheets",
        required:true
    },
    name: {
        type: String,
        required: true,
    },
    series: {
        type: String,
        required: true
    },
    repetition: {
        type: String,
        required: true
    },
    member: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    } 
});

const itemTrainingSheet = mongoose.model("itemTrainingSheets", itemTrainingSheetSchema)

export default itemTrainingSheet;