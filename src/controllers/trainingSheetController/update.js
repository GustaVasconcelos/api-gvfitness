import { updateService } from "../../services/trainingSheet.services.js";
import { EMPTY_FIELDS_MESSAGE, SUCCESS_MESSAGE_UPDATE } from "../../messages/messages.js";

const update = async (req, res) => {
    const id = req.id;
    const { name } = req.body;
    const updated_at = new Date();

    if (!name) {
        return res.status(400).json({ "error":EMPTY_FIELDS_MESSAGE });
    }
    
    try {
        
        await updateService(id, name, updated_at);
    
        return res.status(200).json({ "message": SUCCESS_MESSAGE_UPDATE });
    } catch (err) {
        return res.status(500).json({ "error":err.message })
    }
}

export default update;