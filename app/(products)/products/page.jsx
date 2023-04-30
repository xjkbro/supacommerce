import ProductGrid from "./ProductGrid";

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import { Redis } from "@upstash/redis";

export const revalidate = 0;
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function Products() {
    // const page = searchParams.page ? searchParams.page : 0;
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const res = await redis.get("availableProducts");
    if (res) {
        console.log("from cache");
        return (
            <div>
                <ProductGrid products={res} />
            </div>
        );
    }
    let { data: products, error } = await supabase
        .from("products")
        .select("id, title, slug, image, short_description, price")
        .eq("visible", true);
    // await redis.set("availableProducts", products, { ex: 3600, nx: true });
    console.log("from supabase");
    return (
        <div>
            <ProductGrid products={products} />
        </div>
    );
}
