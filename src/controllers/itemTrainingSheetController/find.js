import { NO_ITEMS_MESSAGE } from "../../messages/messages.js";
import { findService } from "../../services/itemTrainingSheet.services.js";

const find = async (req, res) => {
    try {
        const itemsTrainingSheet = await findService();

        if(itemsTrainingSheet.length === 0) {
            return res.status(404).json({ "error": NO_ITEMS_MESSAGE})
        } 

        return res.status(200).json(itemsTrainingSheet);
    } catch(err) {
        return res.status(500).json({ "error":err.message })
    }
}

export default find;