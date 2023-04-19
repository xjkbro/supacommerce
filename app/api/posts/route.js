import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";

// do not cache this page
export const revalidate = 0;

export async function GET() {
    const supabase = createRouteHandlerSupabaseClient({
        headers,
        cookies,
    });
    const { data } = await supabase.from("posts").select("*");
    return NextResponse.json(data);
}
