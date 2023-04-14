import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import Link from "next/link";
import { headers, cookies } from "next/headers";

export default async function DownloadCategories() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const { data } = await supabase
        .from("download_category")
        .select("id, name");
    console.log(data);
    return (
        <div>
            {data.map((item) => (
                <Link
                    className="block"
                    key={item.id}
                    href={"/admin/download-categories/" + item.id}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
}
