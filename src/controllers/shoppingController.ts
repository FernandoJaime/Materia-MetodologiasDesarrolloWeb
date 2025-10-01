import { Request, Response } from "express";
import Shopping from "../models/shoppingModel";
import Detail from "../models/detailsModel";
import Product from "../models/productModel";

export const createShopping = async (req: Request, res: Response) => {
    try {
        const { description, document, client, pagado, products } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Debe enviar al menos un producto" });
        }

        // Caculo el precio total y preparo los detalles
        let totalPrice = 0;
        const detailsData: any[] = [];

        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ error: `Producto ${item.productId} no encontrado` });
            }

            const subtotal = product.price * item.amount;
            totalPrice += subtotal;

            detailsData.push({
                amount: item.amount,
                product: product._id,
                unitPrice: product.price
            });
        }

        // Creo la compra
        const shopping = await Shopping.create({
            description,
            document,
            client,
            pagado,
            totalPrice
        });

        // Creo los detalles de la compra
        const details = await Promise.all(
            detailsData.map(d => Detail.create({ ...d, shopping: shopping._id }))
        );

        return res.status(201).json({
            shopping,
            details
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message || "Error interno" });
    }
};

export const getShoppings = async (req: Request, res: Response) => {
    try {
        const shoppings = await Shopping.find();

        // Por cada shopping cantidadProductos
        const results = await Promise.all(
            shoppings.map(async (shopping) => {
                const details = await Detail.find({ shopping: shopping._id });

                const cantidadProductos = details.reduce(
                    (sum, d) => sum + (d.amount || 0),
                    0
                );

                return {
                    id: shopping._id,
                    description: shopping.description,
                    document: shopping.document,
                    client: shopping.client,
                    totalPrice: shopping.totalPrice,
                    pagado: shopping.pagado,
                    date: shopping.date,
                    cantidadProductos,
                };
            })
        );

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las compras", details: error });
    }
};

export const getShoppingDetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const shopping = await Shopping.findById(id);
        if (!shopping) return res.status(404).json({ error: "Compra no encontrada" });

        // Aggregate para traer los detalles con info de producto y categoría
        const detalleProductos = await Detail.aggregate([
            { $match: { shopping: shopping._id } },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "productData"
                }
            },
            { $unwind: "$productData" },
            {
                $lookup: {
                    from: "categories",
                    localField: "productData.category",
                    foreignField: "_id",
                    as: "categoryData"
                }
            },
            { $unwind: { path: "$categoryData", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    idProducto: "$productData._id",
                    nombre: "$productData.name",
                    cantidad: "$amount",
                    precioUnitario: "$unitPrice",
                    categoria: "$categoryData.name"
                }
            }
        ]);

        res.json({
            id: shopping._id,
            description: shopping.description,
            document: shopping.document,
            client: shopping.client,
            totalPrice: shopping.totalPrice,
            pagado: shopping.pagado,
            date: shopping.date,
            detalleProductos
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la compra", details: error });
    }
};

export const getDetails = async (req: Request, res: Response) => {
    try {
        const details = await Detail.aggregate([
            {
                $lookup: {
                    from: "products",            
                    localField: "product",       
                    foreignField: "_id",         
                    as: "productData"
                }
            },
            { $unwind: "$productData" },    
            {
                $project: {
                    idShopping: "$shopping",
                    date: 1,
                    product: "$productData.name",
                    unitPrice: 1,
                    amount: 1
                }
            }
        ]);

        res.json(details);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los detalles", details: error });
    }
};