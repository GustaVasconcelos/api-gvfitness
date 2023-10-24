import { EMPTY_FIELDS_MESSAGE, SUCCESS_MESSAGE_CREATE } from "../../messages/messages.js";
import { createService } from "../../services/itemTrainingSheet.services.js";

const create = async (req, res) => {
    const trainingSheetId = req.id;
    const { name, series, repetition, member } = req.body;

    if (!name || !series || !repetition || !member) {
        return res.status(400).json({ "error": EMPTY_FIELDS_MESSAGE})
    }

    try {
        await createService({trainingSheetId, name, series, repetition, member});
    
        return res.status(201).json({ "message":SUCCESS_MESSAGE_CREATE})
    } catch(err) {
        return res.status(500).json({ "error":err.message })
    }
}

export default create;