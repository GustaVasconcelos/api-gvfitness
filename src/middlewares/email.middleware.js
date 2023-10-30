import validator from "validator";
import { findEmailService } from "../services/user.services.js";
import { INVALID_EMAIL_MESSAGE, EMAIL_EXISTS_MESSAGE } from "../messages/messages.js";


const validEmail = (req, res, next) => {
    const email = req.body.email;

    if (email && !validator.isEmail(email)) {
        return res.status(400).json({ "error": INVALID_EMAIL_MESSAGE });
    }

    next();
}

const emailExistsInDb = async (req, res, next) => {
    const email = req.body.email;
    const emailIsUnique = await findEmailService(email);

    if (email && emailIsUnique) {
        return res.status(400).json({ "error": EMAIL_EXISTS_MESSAGE });
    }

    next();
}
export {
    validEmail,
    emailExistsInDb
}