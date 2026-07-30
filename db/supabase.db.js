import { createClient } from "@supabase/supabase-js";

export const client = createClient(process.env.SUPABASE , process.env.SUPABASE_KEY)

try {
    await client
    console.log("connect to supabase successfully");
} catch (error) {
    console.log("failed to connect", error);
}