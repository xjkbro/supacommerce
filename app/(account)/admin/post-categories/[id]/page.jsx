import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import CategoryForm from "./CategoryForm";
export const revalidate = 0;

export default async function EditPostCategory({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    let { data: category } = await supabase
        .from("post_category")
        .select("*")
        .eq("id", params.id)
        .single();
    return (
        <div>
            <CategoryForm category={category} />
        </div>
    );
}
