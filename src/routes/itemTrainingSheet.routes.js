import { Router } from 'express';
import create from '../controllers/itemTrainingSheetController/create.js';
import find from '../controllers/itemTrainingSheetController/find.js';
import destroy from '../controllers/itemTrainingSheetController/delete.js';
import findAllItemsTrainingSheet from '../controllers/itemTrainingSheetController/findAllItemsTrainingSheet.js';
import { validId } from '../middlewares/user.middleware.js';
import { validItemTrainingSheet } from '../middlewares/itemTrainingSheet.middleware.js';
import { validTrainingSheet } from '../middlewares/trainingSheet.middleware.js';
import update from '../controllers/itemTrainingSheetController/update.js';

const router = Router();

router.get("/", find);
router.get("/trainingSheet/:id", validId, validTrainingSheet, findAllItemsTrainingSheet)
router.post("/:id", validId, validTrainingSheet, create);
router.delete("/:id", validId, validItemTrainingSheet, destroy);
router.patch("/:id", validId, validItemTrainingSheet, update);


export default router;