import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import CategoryHeader from "../CategoryHeader";
import CategoryTabs from "../CategoryTabs";

export const revalidate = 0;
export default async function SingleCategory({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: category, error: currentError } = await supabase
        .from("categories")
        .select("id, title, slug, description, short_description, parent")
        .eq("slug", params.slug)
        .single();

    let { data: children, error: childrenError } = await supabase
        .from("categories")
        .select("id, title, slug, short_description, parent")
        .eq("parent", category.id);

    let { data: products, error: productsError } = await supabase
        .from("product_to_category")
        .select(
            `
            id,
            product_id (
            id, title, slug, short_description, price 
            )
        `
        )
        .eq("category_id", category.id);

    return (
        <main>
            <CategoryHeader category={category} />
            <div className="w-11/12 md:w-3/4 my-12 mx-auto min-h-[36rem]">
                <CategoryTabs
                    category={category}
                    subcategories={children}
                    products={products}
                />
            </div>
        </main>
    );
}
