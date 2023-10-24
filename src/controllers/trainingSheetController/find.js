import { NO_ITEMS_MESSAGE } from "../../messages/messages.js";
import { findService } from "../../services/trainingSheet.services.js";

const find = async (req, res) => {

    try {
        const trainingSheets = await findService();
    
        if (!trainingSheets) {
            return res.status(404).json({ "error": NO_ITEMS_MESSAGE});
        }
    
        return res.status(200).json(trainingSheets);
    } catch(err) {
        return res.status(500).json({ "error":err.message });
    }
}

export default find;