import { createService } from "../../services/trainingSheet.services.js";
import { EMPTY_FIELDS_MESSAGE, SUCCESS_MESSAGE_CREATE } from "../../messages/messages.js";

const create = async (req, res) => {
    try {
        const user_id = req.id;
        const { name } = req.body;
    
        if (!name) {
            return res.status(400).json({ "error":EMPTY_FIELDS_MESSAGE });
        }
    
        await createService({ name, user_id });
    
        return res.status(201).json({ "message": SUCCESS_MESSAGE_CREATE });
    } catch (err) {
        return res.status(500).json({ "error":err.message })
    }
}

export default create;