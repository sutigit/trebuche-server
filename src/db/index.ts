import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Database } from "./types";

dotenv.config();

const supabaseUrl = "https://vutuqhljydsjjynubjla.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);
