import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Payload del token
interface JwtPayload {
    email: string;
    role: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}

// Verificar el token 
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token requerido' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}

// Verificar rol
export function requireRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.role !== role) {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
        next();
    }
}