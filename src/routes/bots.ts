import express, { Request, Response } from "express";
import db from "@/lib/supabase";

const router = express.Router();

// router.get("/", async (req: Request, res: Response) => {
//   const { data, error } = await db.from("default_bots").select();
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   return res.status(200).json({ data });
// });

// router.get("/default/:id", async (req: Request, res: Response) => {
//   const bot_id = Number(req.params.id);
//   const { data, error } = await db
//     .from("default_bots")
//     .select()
//     .eq("id", bot_id)
//     .single();
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   return res.status(200).json({ data });
// });

// router.get("/user/:id", async (req: Request, res: Response) => {
//   const user_id = req.params.id;
//   const { data, error } = await db
//     .from("private_bots")
//     .select()
//     .eq("user_id", user_id);
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   return res.status(200).json({ data });
// });

export default router;
