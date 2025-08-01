import express, { Request, Response } from "express";
import db from "@/lib/supabase";

const router = express.Router();

router.get("/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { data, error } = await db
    .from("profiles")
    .select()
    .eq("user_id", user_id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ data });
});

router.patch("/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { username } = req.body;
  const { data, error } = await db
    .from("profiles")
    .update({ username })
    .eq("user_id", user_id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ data });
});

export default router;
