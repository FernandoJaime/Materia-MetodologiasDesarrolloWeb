import { Request, Response } from "express";
import Product from "../models/productModel";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, active, image, price, category } = req.body;
        const product = await Product.create({
            name, description, active, image, price, category
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, { active: false }, { new: true });

        if (!product) return res.status(404).json({ error: "Producto no encontrado" });

        res.json({ message: "Producto dado de baja correctamente" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { ...rest } = req.body;

        const product = await Product.findByIdAndUpdate(id, rest, { new: true });

        if (!product) return res.status(404).json({ error: "Producto no encontrado" });

        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ error: error });
    }
};