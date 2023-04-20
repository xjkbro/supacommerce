import { supabaseCDN } from "@/lib/supabase-cdn";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Downloads() {
    const supabase = await createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const { data: downloads } = await supabase.from("downloads").select("*");
    return (
        <div className="overflow-x-auto min-h-[50vh]">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>company</th>
                        <th>location</th>
                        <th>Last Login</th>
                        <th>Favorite Color</th>
                    </tr>
                </thead>
                <tbody>
                    {downloads.map((item, i) => (
                        <tr key={item.id}>
                            <th>{i}</th>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>Canada</td>
                            <td>12/16/2020</td>
                            <td>Blue</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>company</th>
                        <th>location</th>
                        <th>Last Login</th>
                        <th>Favorite Color</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
