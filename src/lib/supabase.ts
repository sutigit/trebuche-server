import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Database } from "./supabase.types";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
