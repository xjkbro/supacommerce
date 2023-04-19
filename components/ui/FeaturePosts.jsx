import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function FeaturePosts() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    let { data: posts } = await supabase
        .from("posts")
        .select("id,title,slug,short_description");
    return (
        <div className="w-11/12 md:w-3/4 my-12 mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black my-4">Articles</h2>
                <Link
                    className="hover:underline uppercase text-sm font-semibold"
                    href="/articles"
                >
                    View All
                </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {[...posts, ...posts].map((item, i) => (
                    <div
                        key={item.title + i}
                        className="card w-full h-full bg-base-100 shadow-xl image-full"
                    >
                        <figure>
                            <Image
                                src={`https://anyzlthrxmlnduuesdhk.supabase.co/storage/v1/object/public/posts/${item.slug}.png`}
                                alt={item.title}
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-white">
                                {item.title}
                            </h2>
                            <p className="text-white">
                                {item.short_description}
                            </p>
                            <div className="card-actions justify-end">
                                <Link
                                    href={`/article/${item.slug}`}
                                    className="btn btn-primary"
                                >
                                    Read Now
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
