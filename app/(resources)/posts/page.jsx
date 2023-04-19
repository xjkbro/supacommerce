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
        .select("id,title,slug,short_description, created_at");
    // let {data: categories}
    return (
        <div className=" mx-auto w-11/12 md:w-3/4 my-12">
            <div>
                <h1 className="text-5xl font-bold">Articles</h1>
                <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                </p>
            </div>
            <div className="md:grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2">
                    <div className="collapse border-slate-100 bg-white border">
                        <input type="checkbox" className="peer" checked />
                        <div className="collapse-title collapse-open bg-slate-100 font-semibold peer-checked:border-b border-slate-100">
                            Categories
                        </div>
                        <div className="collapse-content bg-white">
                            <ul className="menu w-full pt-4">
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 2</a>
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
                    <div className="collapse border-slate-100 bg-white border">
                        <input type="checkbox" className="peer" checked />
                        <div className="collapse-title collapse-open bg-slate-100 font-semibold peer-checked:border-b border-slate-100">
                            Video Categories
                        </div>
                        <div className="collapse-content bg-white">
                            <ul className="menu w-full pt-4">
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 2</a>
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

                    {/* <div className="card w-full bg-base-100 shadow-xl">
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
                </div> */}
                </div>
                <div className=" col-span-2 flex flex-col gap-4">
                    {[...posts, ...posts, ...posts].map((item) => (
                        <Link
                            key={item.id}
                            className="hover:bg-base-200 transition-all p-4 grid md:grid-cols-4 grid-cols-1 items-center gap-2"
                            href={"/article/" + item.slug}
                        >
                            <div className="md:w-42 md:h-42 object-cover col-span-1">
                                <Image
                                    width={150}
                                    height={150}
                                    alt="cat"
                                    className="w-full md:w-42 md:h-42 object-cover"
                                    src={supabaseCDN(
                                        "posts",
                                        item.slug + ".png"
                                    )}
                                />
                            </div>
                            <div className="co-span-1 md:col-span-3">
                                <h2 className="text-2xl font-bold">
                                    {item.title}
                                </h2>
                                <small>
                                    Published Date:{" "}
                                    {new Date(item.created_at).toDateString()}
                                </small>
                                <p className="font-light text-sm">
                                    {item.short_description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
