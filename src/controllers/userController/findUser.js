/**
 * Retorna o usuário com o id passado.
 */
const findUser = async (req, res) => {
    return res.status(200).json({user:req.user})
}

export default findUser;