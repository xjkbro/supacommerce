import React from "react";
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";

export default async function FeaturedSeries({ series }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: seriesQuery, error: currentError } = await supabase
        .from("products")
        .select("id, title, image, slug, short_description, price")
        .textSearch("title", `${series}`)
        .limit(6);

    return (
        <div className="w-3/4 my-12 mx-auto relative">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black my-4">Featured Series</h2>
                <Link className="hover:underline" href="/">
                    View All
                </Link>
            </div>
            {/* <div className="carousel carousel-end rounded-box">
                <div className="carousel-item">
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                        width={300}
                        height={300}
                        alt="prod"
                        className="w-full"
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                        width={300}
                        height={300}
                        alt="prod"
                        className="w-full"
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                        width={300}
                        height={300}
                        alt="prod"
                        className="w-full"
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                        width={300}
                        height={300}
                        alt="prod"
                        className="w-full"
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                        width={300}
                        height={300}
                        alt="prod"
                        className="w-full"
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                        width={300}
                        height={300}
                        alt="prod"
                        className="w-full"
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80"
                        width={300}
                        height={300}
                        alt="prod"
                        className="w-full"
                    />
                </div>
            </div> */}
            <div className="carousel w-full gap-2">
                {seriesQuery ? (
                    seriesQuery.map((item) => (
                        <div
                            key={item.id}
                            className="carousel-item relative h-fit w-64 border border-base-200 flex justify-center"
                        >
                            <div className=" flex flex-col my-12 items-center">
                                <Image
                                    src={item.image}
                                    width={300}
                                    height={300}
                                    alt="prod"
                                    className="w-56 h-56 object-contain"
                                />
                                <div className="w-56 my-4">
                                    <Link
                                        href={"/products/" + item.slug}
                                        className="text-xl font-semibold"
                                    >
                                        {item.title}
                                    </Link>
                                    <p className="text-lg font-light text-red-500 mb-4">
                                        ${item.price.toFixed(2)}
                                    </p>

                                    <button className="btn btn-block">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
            {/* <div className="absolute flex items-center justify-between transform left-5 right-5 top-1/2">
                <button className="btn btn-circle">❮</button>
                <button className="btn btn-circle">❯</button>
            </div> */}
        </div>
    );
}
