import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import auth from "./routes/auth";
import openai from "./routes/openai";
import profiles from "./routes/profiles";
import bots from "./routes/bots";
import conversations from "./routes/conversations";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);
app.use("/profiles", profiles);
app.use("/bots", bots);
app.use("/conversations", conversations);
app.use("/openai", openai);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
