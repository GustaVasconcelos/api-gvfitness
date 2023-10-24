import { NOT_FOUND_MESSAGE } from "../messages/messages.js";
import { findItemTrainingSheetIdService } from "../services/itemTrainingSheet.services.js";

const validItemTrainingSheet = async (req, res, next) => {
    const id = req.params.id;
    
    try {
        const itemTrainingSheet = await findItemTrainingSheetIdService(id);

        if (!itemTrainingSheet) {
            return res.status(404).json({ "error": NOT_FOUND_MESSAGE})
        }

        req.id = id;
        req.itemTrainingSheet = itemTrainingSheet;

        next();
    } catch(err) {
        return res.status(500).json({ "error":err.message });
    }
}

export {
    validItemTrainingSheet
}