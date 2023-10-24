import { findAllItemsTrainingSheetService } from "../../services/itemTrainingSheet.services.js";

const findAllItemsTrainingSheet = async (req, res) => {
    const trainingSheetid = req.id;
    
    try {
        const itemsTrainingSheet = await findAllItemsTrainingSheetService(trainingSheetid);

        return res.status(200).json(itemsTrainingSheet);
    } catch(err) {
        return res.status(500).json({ "error":err.message });
    }
}

export default findAllItemsTrainingSheet;