import { Router } from 'express';
import { validId, validUser } from '../middlewares/user.middleware.js';
import { validTrainingSheet } from '../middlewares/trainingSheet.middleware.js';
import create from '../controllers/trainingSheetController/create.js';
import find from '../controllers/trainingSheetController/find.js';
import update from '../controllers/trainingSheetController/update.js';
import destroy from '../controllers/trainingSheetController/delete.js';
import findTrainingSheetUser from '../controllers/trainingSheetController/findTrainingSheetUser.js';

const router = Router();

router.get("/", find);
router.get("/user/:id", validId, validUser, findTrainingSheetUser);
router.post("/:id", validId, validUser, create);
router.patch("/:id", validId, validTrainingSheet, update);
router.delete("/:id", validId, validTrainingSheet, destroy);

export default router;