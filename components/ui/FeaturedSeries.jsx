import React from "react";
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
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
            <ProductCarousel items={seriesQuery} />
            {/* <div className="absolute flex items-center justify-between transform left-5 right-5 top-1/2">
                <button className="btn btn-circle">❮</button>
                <button className="btn btn-circle">❯</button>
            </div> */}
        </div>
    );
}
