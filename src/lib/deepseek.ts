import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const deepseek = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export default deepseek;
