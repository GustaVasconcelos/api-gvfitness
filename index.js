import express from 'express';
import dotenv from 'dotenv';
import ConnectDataBase from './src/dataBase/db.js';
import cors from 'cors';


dotenv.config();

const app = express();
const port = 5000;

app.use(cors());

app.get('/', (req,res) => {
    res.send("hello world");
})

ConnectDataBase(); //Conectando o banco de dados

app.listen(port, console.log('Rodando na porta: ' + port))