import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
export const revalidate = 0;

export default async function Webinar({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    let { data: webinar } = await supabase
        .from("webinars")
        .select("*")
        .eq("id", params.id)
        .single();
    return <div>{webinar.title}</div>;
}
