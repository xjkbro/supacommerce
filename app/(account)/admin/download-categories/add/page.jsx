import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { headers, cookies } from "next/headers";
import DownloadForm from "./DownloadForm";
// import { v4 as uuidv4 } from "uuid";
export const revalidate = 0;

export default async function AddDownloadCategory() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    // const { data: downloadCategory } = await supabase
    //     .from("download_category")
    //     .select("*");
    return (
        <div>
            <DownloadForm />
        </div>
    );
}
