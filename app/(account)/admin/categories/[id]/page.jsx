import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
export const revalidate = 0;

export default async function Category({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    let { data: category } = await supabase
        .from("categories")
        .select("id, name")
        .eq("id", params.id)
        .single();
    return <div>{category.name}</div>;
}
