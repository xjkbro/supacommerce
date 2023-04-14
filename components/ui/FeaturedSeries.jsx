import React from "react";
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import ProductCarousel from "./ProductCarousel";

export default async function FeaturedSeries({ series }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: seriesQuery, error: currentError } = await supabase
        .from("products")
        .select("id, title, image, slug, short_description, price")
        .textSearch("title", `${series}`);

    return (
        <div className="w-11/12 md:w-3/4 my-12 mx-auto relative">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black my-4">Featured Series</h2>
                <Link
                    className="hover:underline uppercase text-sm font-semibold"
                    href="/"
                >
                    View All
                </Link>
            </div>
            <ProductCarousel items={seriesQuery} />
        </div>
    );
}
