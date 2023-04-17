import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";

export const revalidate = 0;

export default async function Categories() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: posts } = await supabase.from("posts").select("*");
    return (
        <div>
            {posts.map((item) => (
                <div key={item.slug}>{item.title}</div>
            ))}
        </div>
    );
}
