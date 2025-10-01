import mongoose from "mongoose";

const shoppingSchema = new mongoose.Schema({
    description:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    document: {
        type: String
    },
    client: {
        type: String,
        required: [true, 'El cliente de la compra es obligatorio']
    },
    totalPrice: {
        type: Number
    },
    pagado: {
        type: Boolean
    }
})

export default mongoose.model("Shopping", shoppingSchema);