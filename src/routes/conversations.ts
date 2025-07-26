import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "List of conversations" });
});

router.post("/", (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({ message: `Conversation ${name} created` });
});

export default router;
