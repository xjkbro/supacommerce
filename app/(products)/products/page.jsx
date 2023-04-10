import ProductGrid from "./ProductGrid";

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

// do not cache this page
// export const revalidate = 0;

export default async function Products() {
    // const page = searchParams.page ? searchParams.page : 0;
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: products, error } = await supabase
        .from("products")
        .select("id, title, slug, image, short_description, price");
    return (
        <div>
            <ProductGrid products={products} />
        </div>
    );
}
