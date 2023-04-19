import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import ProductForm from "../ProductForm";

export const revalidate = 0;

export default async function Product({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();
    const { data: categories } = await supabase.from("categories").select("*");
    const { data: category } = await supabase
        .from("product_to_category")
        .select("*")
        .eq("product_id", params.id)
        .single();

    const { data: bucket, error } = await supabase.storage
        .from("products")
        .list(params.id);

    return (
        <>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <ProductForm
                product={product}
                bucket={bucket}
                categories={categories}
                category={category}
            />
        </>
    );
}
