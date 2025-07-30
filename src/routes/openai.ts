import express, { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../db/index";
import openai from "../lib/openai";
import { EmbeddingModel } from "openai/resources/embeddings";

dotenv.config();
const router = express.Router();

router.post("/basic", async (req: Request, res: Response) => {
  const content = req.body.content;

  let output = "";
  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL,
      input: content,
    });

    output = response.output_text;
  } catch (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ response: output });
});

router.post("/bot/:id", async (req: Request, res: Response) => {
  const bot_id = Number(req.params.id);
  const content = req.body.content;

  const { data, error } = await db
    .from("default_bots")
    .select()
    .eq("id", bot_id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  let output = "";
  try {
    const response = await openai.responses.create({
      instructions: data.instructions,
      model: process.env.OPENAI_MODEL,
      input: content,
    });

    output = response.output_text;
  } catch (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ response: output });
});

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
