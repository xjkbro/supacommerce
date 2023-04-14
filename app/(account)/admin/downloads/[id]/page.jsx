import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { headers, cookies } from "next/headers";
import DownloadForm from "./DownloadForm";
// import { v4 as uuidv4 } from "uuid";

export default async function EditDownload({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const { data: download } = await supabase
        .from("downloads")
        .select("*")
        .eq("id", params.id)
        .single();

    const { data: bucket } = await supabase.storage
        .from("downloads")
        .list(`${params.id}`, {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
        });
    return (
        <div>
            {/* <br /> */}
            {/* <pre>{JSON.stringify(bucket, null, 2)}</pre> */}
            <DownloadForm download={download} bucket={bucket} />
        </div>
    );
}
