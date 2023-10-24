import mongoose from 'mongoose';

const trainingSheetSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
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

const trainingSheet = mongoose.model("trainingSheets", trainingSheetSchema)

export default trainingSheet;