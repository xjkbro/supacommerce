import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import CategoryForm from "./CategoryForm";

// do not cache this page
export const revalidate = 0;

export default async function Category() {
    // const page = searchParams.page ? searchParams.page : 0;
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: categories, error } = await supabase
        .from("categories")
        .select("*");
    return (
        <div>
            <CategoryForm categories={categories} />
        </div>
    );
}
