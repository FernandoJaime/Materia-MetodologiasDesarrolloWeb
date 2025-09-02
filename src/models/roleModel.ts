import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio']
    },
    description: {
        type: String
    }
});

export default mongoose.model("Role", roleSchema);