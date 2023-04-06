import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

import { readFile } from "fs/promises";
const json = JSON.parse(
    await readFile(new URL("./test.json", import.meta.url))
);

json.map((i) => {
    console.log(i);
});
