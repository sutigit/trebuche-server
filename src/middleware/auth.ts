import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const expectedKey = `Bearer ${process.env.TREBUCHE_API_KEY}`;

  if (authHeader !== expectedKey) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}
