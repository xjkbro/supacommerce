import ProductGrid from "./ProductGrid";

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

// do not cache this page
export const revalidate = 0;

export default async function Products() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: products, error } = await supabase
        .from("products")
        .select(
            "id, title, slug, image, short_description, price, visible, available"
        )
        .eq("visible", true)
        .order("title", { ascending: true });
    return (
        <div>
            <ProductGrid products={products} />
        </div>
    );
}
