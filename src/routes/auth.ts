import express, { Request, Response } from "express";
import db from "@/lib/supabase";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  let { data, error } = await db.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ data });
});

router.post("/logout", async (req: Request, res: Response) => {
  let { error } = await db.auth.signOut();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).send();
});

export default router;
