import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlenghth: [50, 'El nombre no puede tener más de 50 caracteres']
    },
    lastName:{
        type: String
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: [true, 'El correo ya está registrado'],
        match: [/\S+@\S+\.\S+/, 'El correo no es válido']
    },
    age: {
        type: Number,
        required: [true, 'La edad es obligatoria'],
        min: [0, 'La edad no puede ser negativa']
    }
})

export default mongoose.model("User", userSchema);