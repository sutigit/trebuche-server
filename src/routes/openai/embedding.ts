import express, { Request, Response } from "express";
import dotenv from "dotenv";
import openai from "@/lib/openai";
import { EmbeddingModel } from "openai/resources/embeddings";

dotenv.config();
const router = express.Router();

router.post("/embedding", async (req: Request, res: Response) => {
  const content = req.body.content;

  let embedding = [];

  try {
    const res = await openai.embeddings.create({
      model: process.env.OPENAI_EMBEDDING_MODEL as EmbeddingModel,
      input: content,
      encoding_format: "float",
    });

    embedding = res.data[0].embedding;
  } catch (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ embedding });
});

export default router;
