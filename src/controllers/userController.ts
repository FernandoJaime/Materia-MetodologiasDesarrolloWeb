import { Request, Response } from "express";
import User from "../models/userModel";
import Role from "../models/roleModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, age, password, role } = req.body;
    const pass_hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, lastName, email, age, password: pass_hash, role
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, ...rest } = req.body;

    if (password) {
      rest.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true, runValidators: true }).select('-password');

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json(user);
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ error: `El correo "${error.keyValue.email}" ya está en uso` });
    }
    res.status(500).json({ error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    const rolName = await Role.findById(user.role);
    if (!rolName) return res.status(500).json({ error: "Rol asociado al usuario no encontrado, error de soporte" });

    res.status(200).json({ token, user: {email: user.email, rol: rolName.name } });
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
}