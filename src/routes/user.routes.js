import { Router } from "express";
import create from "../controllers/userController/create.js";
import find from "../controllers/userController/find.js";
import login from "../controllers/userController/login.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import update from "../controllers/userController/update.js";
import { validId, validUser } from "../middlewares/user.middleware.js";
import destroy from "../controllers/userController/delete.js";
import findUser from "../controllers/userController/findUser.js";


const router = Router();

router.get('/', find);
router.get('/:id', validId, validUser, findUser)
router.post('/', create);
router.post('/login', login);
router.patch('/', authMiddleware, update);
router.delete('/:id', validId, validUser, destroy);

export default router;

