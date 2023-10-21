import { deleteUserService } from "../../services/user.services.js"

const SUCCESS_MESSAGE = "Usuário deletado";
/**
 * Deleta o usuário com o id passado.
 */
const destroy = async (req, res) => {

    const userId = req.id

    try {
        await deleteUserService(userId);

        return res.status(200).json({ "message": SUCCESS_MESSAGE });

    } catch (err) {
        return res.status(500).json({ "error":err.message })
    }

}

export default destroy;