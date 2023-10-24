import { NO_TRAININGSHEET_MESSAGE } from "../messages/messages.js";
import { findTrainingSheetIdService } from "../services/trainingSheet.services.js";

const validTrainingSheet = async (req, res, next) => {
    const id = req.params.id;

    try {
        const trainingSheet = await findTrainingSheetIdService(id);

        if (!trainingSheet) {
            return res.status(404).json({ error: NO_TRAININGSHEET_MESSAGE });
        }

        req.id = id;
        req.trainingSheet = trainingSheet;

        next();

    } catch (err) {
        return res.status(500).json({ "error": err.message });
    }
}

export {
    validTrainingSheet
}