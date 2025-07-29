import express, { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../db/index";
import openai from "../lib/openai";

dotenv.config();
const router = express.Router();

router.post("/basic", async (req: Request, res: Response) => {
  const content = req.body.content;
  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL,
    input: content,
  });

  const output = response.output_text;

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

  const response = await openai.responses.create({
    instructions: data.instructions,
    model: process.env.OPENAI_MODEL,
    input: content,
  });

  const output = response.output_text;

  return res.status(200).json({ response: output });
});

export default router;
