import express, { Request, Response } from "express";
import db from "../db/index";

const router = express.Router();

router.get("/default", async (req: Request, res: Response) => {
  const { data, error } = await db.from("default_bots").select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ data });
});

router.get("/user/:uid", async (req: Request, res: Response) => {
  const user_id = req.params.uid;
  const { data, error } = await db
    .from("private_bots")
    .select()
    .eq("user_id", user_id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ data });
});

export default router;
