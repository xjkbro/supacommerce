import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { arbritraryArray } from "@/lib/utils";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { supabaseCDN } from "@/lib/supabase-cdn";

export default async function Article() {
    // const arr = arbritraryArray(10);
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    let { data: posts } = await supabase
        .from("posts")
        .select("id,title,slug,short_description");
    return (
        <div className="md:grid grid-cols-3 mx-auto w-11/12 md:w-3/4 my-12 gap-4">
            <div className="col-span-1 space-y-2">
                <div className="card w-full bg-base-100 shadow-xl">
                    <ul className="menu bg-base-100 w-full p-2 rounded-box">
                        <li className="menu-title">
                            <span>Category</span>
                        </li>
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                        <li className="menu-title">
                            <span>Category</span>
                        </li>
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
                <div className="card w-full bg-base-100 shadow-xl">
                    <ul className="menu bg-base-100 w-full p-2 rounded-box">
                        <li className="menu-title">
                            <span>Category</span>
                        </li>
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                        <li className="menu-title">
                            <span>Category</span>
                        </li>
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className=" col-span-2 flex flex-col gap-4">
                {posts.map((item) => (
                    <Link
                        key={item.id}
                        className="hover:bg-base-200 transition-all p-4 grid md:grid-cols-4 grid-cols-1 gap-2"
                        href={"/article/" + item.slug}
                    >
                        <div className="md:w-42 md:h-42 object-cover col-span-1">
                            <Image
                                width={150}
                                height={150}
                                alt="cat"
                                className="w-full md:w-42 md:h-42 object-cover"
                                src={supabaseCDN("posts", item.slug + ".png")}
                            />
                        </div>
                        <div className="co-span-1 md:col-span-3">
                            <h2 className="text-2xl font-bold">{item.title}</h2>
                            <p className="font-light">
                                {item.short_description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
