import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del usuario es obligatorio']
    },
    lastName:{
        type: String,
        required: [true, 'El correo del usuario es obligatorio']
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'El correo del usuario es obligatorio']
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: [true, 'La contraseña del usuario es obligatoria']
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: [true, 'El rol del usuario es obligatorio']
    }
})

export default mongoose.model("User", userSchema);