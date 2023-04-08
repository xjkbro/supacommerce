import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";
import { headers, cookies } from "next/headers";

// do not cache this page
export const revalidate = 0;

export async function GET(request) {
    const supabase = createRouteHandlerSupabaseClient({
        headers,
        cookies,
    });
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const { data } = await supabase
        .from("products")
        .select("id,title,slug,image, price")
        .range(from, to);
    return NextResponse.json(data);
}
