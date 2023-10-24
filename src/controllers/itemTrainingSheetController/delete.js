import { SUCCESS_MESSAGE_DELETE } from "../../messages/messages.js";
import { deleteService } from "../../services/itemTrainingSheet.services.js";

const destroy = async (req, res) => {
    const id = req.params.id;
    
    try {
        await deleteService(id);

        return res.status(200).json({ "message": SUCCESS_MESSAGE_DELETE });
    } catch(err) {
        return res.status(500).json({ "error": err.message });
    }
}

export default destroy;