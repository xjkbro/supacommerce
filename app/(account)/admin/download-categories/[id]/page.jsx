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

    const { data: downloadCategory } = await supabase
        .from("download_category")
        .select("*")
        .eq("id", params.id)
        .single();

    return (
        <div>
            <DownloadForm downloadCategory={downloadCategory} />
        </div>
    );
}
