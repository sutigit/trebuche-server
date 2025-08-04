import express, { Request, Response } from "express";
import dotenv from "dotenv";
import openai from "@/lib/openai";

dotenv.config();
const router = express.Router();

router.post("/responses", async (req: Request, res: Response) => {
  const { instructions, content } = req.body;

  try {
    const response = await openai.responses.create({
      instructions,
      model: process.env.OPENAI_MODEL,
      input: content,
    });

    return res.status(200).json({ response: response.output_text });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
