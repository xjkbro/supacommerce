import Image from "next/image";
import Link from "next/link";
import React from "react";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { supabaseCDN } from "@/lib/supabase-cdn";

export const revalidate = 3600;

export default async function SingleArticle({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    let { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", params.slug)
        .single();
    return (
        <div className="md:grid grid-cols-3 mx-auto w-11/12 md:w-3/4 my-12">
            <div className=" col-span-1 justify-center">
                <Link
                    className="flex gap-2 mb-4 md:justify-center"
                    href="/article"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                        />
                    </svg>
                    Go back
                </Link>
            </div>
            <div className=" col-span-2 prose w-full">
                <Image
                    src={supabaseCDN("posts", post.slug + ".png")}
                    alt="feature"
                    width={800}
                    height={600}
                    className="h-96 object-cover"
                />
                <h2 className="text-2xl font-bold">{post.title}</h2>

                <small>
                    Published Date: {new Date(post.created_at).toDateString()}
                </small>

                <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </div>
    );
}
