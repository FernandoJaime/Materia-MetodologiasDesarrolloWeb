import { Request, Response } from "express";
import Role from "../models/roleModel";

export const createRole = async (req: Request, res: Response) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};