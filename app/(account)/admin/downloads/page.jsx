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
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th className="rounded-none bg-primary text-white">
                            Name
                        </th>
                        <th className="rounded-none bg-primary text-white">
                            Type
                        </th>
                        <th className="rounded-none bg-primary text-white">
                            Products
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {downloads.map((item) => (
                        <tr className="text-sm" key={item.id}>
                            <td>
                                <Link
                                    className="font-bold"
                                    href={"/admin/downloads/" + item.id}
                                >
                                    {item.name}
                                </Link>
                            </td>
                            <td>{item.type}</td>
                            <td>{"products"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
