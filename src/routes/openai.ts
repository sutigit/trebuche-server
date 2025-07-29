import express, { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../db/index";
import openai from "../lib/openai";

dotenv.config();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const content = req.body.content;
  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL,
    input: content,
  });

  const output = response.output_text;

  return res.status(200).json({ message: output });
});

export default router;
