import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { headers, cookies } from "next/headers";
// import AddFile from "./addFile";
export default async function Downloads() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    const { data: items, error } = await supabase.storage
        .from("avatars")
        .list("a1a331c7-4c5f-4d81-b93b-d183ccc42f06", {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
        });

    return (
        <div>
            {/* <AddFile /> */}
            <br />
            <pre>{JSON.stringify(items, null, 2)}</pre>
        </div>
    );
}
