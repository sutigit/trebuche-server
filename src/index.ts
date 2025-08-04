import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

import openai from "./routes/openai";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/openai", openai);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
