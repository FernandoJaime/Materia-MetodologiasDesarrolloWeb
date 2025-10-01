import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: [true, 'La cantidad del detalle es obligatoria']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, 'El producto del detalle es obligatorio']
    },
    unitPrice: {
        type: Number
    },
    shopping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shopping",
        required: [true, 'La compra del detalle es obligatoria']
    }
})

export default mongoose.model("Details", detailsSchema);