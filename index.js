import express from 'express';
import dotenv from 'dotenv';
import ConnectDataBase from './src/dataBase/db.js';
import cors from 'cors';

import userRouter from './src/routes/user.routes.js'
import trainingSheetRouter from './src/routes/trainingSheet.routes.js';
import ItemTrainingSheetRouter from './src/routes/itemTrainingSheet.routes.js';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/trainingSheet", trainingSheetRouter);
app.use("/itemTrainingSheet", ItemTrainingSheetRouter);

ConnectDataBase(); //Conectando o banco de dados

app.listen(port, console.log('Rodando na porta: ' + port))