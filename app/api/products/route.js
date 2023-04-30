import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";
import { headers, cookies } from "next/headers";

import { Redis } from "@upstash/redis";

// do not cache this page
export const revalidate = 3600;

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(request) {
    const supabase = createRouteHandlerSupabaseClient({
        headers,
        cookies,
    });
    const res = await redis.get("availableProducts");
    if (res) {
        return NextResponse.json(res);
    }

    const { data } = await supabase
        .from("products")
        .select("id,title,slug,short_description,price")
        .eq("visible", true);
    await redis.set("availableProducts", products, { ex: 3600, nx: true });

    return NextResponse.json(data);
}
