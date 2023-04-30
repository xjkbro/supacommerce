import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export default async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareSupabaseClient({ req, res });
    await supabase.auth.getSession();

    const ip = req.ip ?? "127.0.0.1";
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(
        ip
    );
    return success
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/blocked", req.url));

    // return res;
}

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(50, "5 s"),
});

export const config = {
    matcher: [
        /*
       * Match all request paths except for the ones starting with:
    //    * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
