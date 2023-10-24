import { INVALID_FIELD_MESSAGE, SUCCESS_MESSAGE_UPDATE } from "../../messages/messages.js";
import { updateService } from "../../services/itemTrainingSheet.services.js";

const update = async (req, res) => {
    const itemTrainingSheet = req.itemTrainingSheet;
    const { name, series, repetition, member } = req.body;

    if (!name && !series && !repetition && !member) {
        return res.status(400).json({ "error":INVALID_FIELD_MESSAGE});
    }
    
    const updatedName = name || itemTrainingSheet.name;
    const updatedSeries = series || itemTrainingSheet.series;
    const updatedRepetition = repetition || itemTrainingSheet.repetition;
    const updatedMember = member || itemTrainingSheet.member;

    try {
        await updateService(itemTrainingSheet._id, updatedName, updatedSeries, updatedRepetition, updatedMember);

        return res.status(200).json({ "message": SUCCESS_MESSAGE_UPDATE });

    } catch(err) {
        return res.status(500).json({ "error": err.message });
    }
}

export default update;