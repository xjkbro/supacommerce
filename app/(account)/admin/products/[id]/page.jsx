import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import ProductForm from "./ProductForm";

export const revalidate = 0;

export default async function Product({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

    return (
        <>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <ProductForm product={data} />
        </>
    );
}
