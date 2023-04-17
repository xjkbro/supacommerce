import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { headers, cookies } from "next/headers";
import Link from "next/link";
export const revalidate = 0;

export default async function Downloads() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    // const { data: bucket } = await supabase.storage
    //     .from("downloads")
    //     .list("/", {
    //         limit: 100,
    //         offset: 0,
    //         sortBy: { column: "name", order: "asc" },
    //     });
    const { data: downloads } = await supabase.from("downloads").select("*");

    return (
        <div>
            <br />
            {/* <pre>{JSON.stringify(downloads, null, 2)}</pre> */}
            <ul>
                {downloads.map((item) => (
                    <li key={item.id}>
                        <Link href={"/admin/downloads/" + item.id}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
