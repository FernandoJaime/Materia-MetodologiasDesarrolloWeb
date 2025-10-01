import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del usuario es obligatorio']
    },
    description:{
        type: String,
        required: [true, 'El correo del usuario es obligatorio']
    },
    active: {
        type: Boolean
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, 'La categoria del producto es obligatorio']
    }
})

export default mongoose.model("Product", productSchema);