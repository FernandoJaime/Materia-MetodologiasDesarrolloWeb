import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes"
import roleRoutes from "./routes/roleRoutes"

dotenv.config();
const app = express();
const port = process.env.PORT;
const mongoUri = process.env.MONGODB_URI!;

app.use(express.json({ limit: '10mb' }));
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('middleware activo')
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

app.listen(port, () => {
    console.log(`APP escuchando on port ${port}`)
})

const connectToDb = async () => {
    try {
        await mongoose.connect(mongoUri, {
        });
        console.log('MongoDB conectado');

    } catch (error) {
        console.error(`Error de conexión a MongoDB: ${error}`);
    }
}
connectToDb();