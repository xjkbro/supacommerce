import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { headers, cookies } from "next/headers";
import DownloadForm from "./DownloadForm";
// import { v4 as uuidv4 } from "uuid";

export default async function AddDownload() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    const { data: bucket } = await supabase.storage
        .from("downloads")
        .list("/", {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
        });

    const { data: downloads } = await supabase.from("downloads").select("*");

    return (
        <div>
            {/* <br /> */}
            {/* <pre>{JSON.stringify(downloads, null, 2)}</pre> */}
            <DownloadForm />
        </div>
    );
}
