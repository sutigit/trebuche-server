import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "List of bots" });
});

router.post("/", (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({ message: `Bot ${name} created` });
});

export default router;
