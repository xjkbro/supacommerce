import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import CategoryForm from "../CategoryForm";
export const revalidate = 0;

export default async function Category({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    let { data: categories } = await supabase.from("categories").select("*");
    let { data: category } = await supabase
        .from("categories")
        .select("*")
        .eq("id", params.id)
        .single();

    return (
        <div>
            <CategoryForm categories={categories} category={category} />
        </div>
    );
}
