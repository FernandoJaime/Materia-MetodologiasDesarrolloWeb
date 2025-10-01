import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    description: {
        type: String
    }
});

export default mongoose.model("Category", categorySchema);