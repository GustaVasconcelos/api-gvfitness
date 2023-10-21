import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    permission: {
        type: String,
        required: true,
        default: "0"
    },
    password: {
        type: String,
        required: true,
        select: false
    }

});

// antes de salvar o usuário no banco, ele irá passar por essa função de criptografia

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);

    next();

});

const User = mongoose.model("Users", userSchema)

export default User;