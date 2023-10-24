import { findTrainingSheetUserIdService } from "../../services/trainingSheet.services.js";

const findTrainingSheetUser = async (req, res) => {
    const user_id = req.id
    
    try {
        const trainingSheets = await findTrainingSheetUserIdService(user_id);

        return res.status(200).json(trainingSheets);

    } catch (err) {
        return res.status(500).json({ "error": err.message })
    }
}

export default findTrainingSheetUser;