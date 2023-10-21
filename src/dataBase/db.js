import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDataBase = () =>{
    //Conexão do banco de dados 
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log('Banco conectado'))
    .catch((erro) => console.log(erro));
}


export default connectDataBase;