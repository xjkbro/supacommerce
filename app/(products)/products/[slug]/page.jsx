import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
// import { remark } from "remark";
// import html from "remark-html";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AddToCart from "../AddToCart";
import ImageLayout from "./ImageLayout";
import BuyNow from "../BuyNow";
import "./styles.css";

export const revalidate = "0";

export default async function SingleProduct({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: product, error: currentError } = await supabase
        .from("products")
        .select("*")
        .eq("slug", params.slug)
        .single();

    let { data: belongsTo, error: productsError } = await supabase
        .from("product_to_category")
        .select(
            `
            id,
            category_id (
            id, name
            )
        `
        )
        .eq("product_id", product.id);

    // console.log(product.id);
    return (
        <main className="bg-base-100 shadow-lg md:border border-base-200 w-11/12 md:w-3/4 my-12 rounded-xl mx-auto md:y-12">
            <div className="max-h-1/2 h-1/2 w-11/12 mx-auto">
                {/* Breadcrumb */}
                <div className="m-2">
                    <div className="text-sm breadcrumbs p-2">
                        {belongsTo.map(({ category_id: c }) => (
                            <ul key={c}>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/category/">Products</Link>
                                </li>
                                <li>
                                    <Link href={"/category/" + c.id}>
                                        {c.name}
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
                {/* Product Details */}
                {/* <div className="flex  flex-col lg:flex-row justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
                            <div className="carousel-item">
                                <Image
                                    className="w-32 h-32 md:w-96 md:h-96 object-contain bg-white rounded-xl"
                                    width={500}
                                    height={500}
                                    alt="cat"
                                    priority
                                    src={product.image}
                                />
                            </div>
                            <div className="carousel-item">
                                <Image
                                    className="w-32 h-32 md:w-96 md:h-96 object-contain bg-white rounded-xl"
                                    width={500}
                                    height={500}
                                    alt="cat"
                                    priority
                                    src={product.image}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 m-2">
                        <div>
                            {belongsTo.map(({ category_id: c }) => (
                                <Link
                                    key={c.id}
                                    className="badge"
                                    href={"/category/" + c.id}
                                >
                                    New Product
                                </Link>
                            ))}
                        </div>
                        <h1 className="text-5xl font-bold">{product.title}</h1>
                        <span className="text-4xl font-bold">
                            ${product.price}
                        </span>
                        <p className="py-6">{product.short_description}</p>
                        <div className="flex gap-2 flex-wrap w-full">
                            <Link href="/" className="btn btn-secondary">
                                Buy Now
                            </Link>
                            <Link href="/" className="btn btn-primary">
                                Add To Cart
                            </Link>
                            <Link
                                href="/"
                                className="btn btn-outline btn-accent"
                            >
                                Add To Quote
                            </Link>
                        </div>
                    </div>
                </div> */}
                <div className="flex  flex-col lg:flex-row md:items-center justify-between gap-4">
                    <ImageLayout product={product} />

                    <div className="w-full md:w-1/2">
                        <div className="mb-2">
                            <div>
                                {belongsTo.map(({ category_id: c }) => (
                                    <Link
                                        key={c.id}
                                        className="badge"
                                        href={"/category/" + c.id}
                                    >
                                        New Product
                                    </Link>
                                ))}
                            </div>
                            <h1 className="text-5xl font-bold">
                                {product.title}
                            </h1>
                            <span className="text-4xl font-bold">
                                ${product.price}
                            </span>
                            <p className="py-6">{product.short_description}</p>
                            <div className="flex gap-2 flex-wrap w-full">
                                {/* <Link href="/" className="btn btn-secondary">
                                Buy Now
                            </Link> */}
                                <BuyNow product={product} />
                                {/* <Link href="/" className="btn btn-primary">
                                Add To Cart
                            </Link> */}
                                <AddToCart product={product} />
                                <Link
                                    href="/"
                                    className="btn btn-outline btn-accent"
                                >
                                    Add To Quote
                                </Link>
                            </div>
                        </div>

                        <div className="my-2">
                            <h3 className="text-xl font-bold my-4">
                                Product Documentation & References
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Link
                                        href="/"
                                        key={item}
                                        target="__blank"
                                        className="flex gap-2 items-center bg-[#f4f4f4] p-2 rounded-md"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                            />
                                        </svg>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-sm ">
                                                User Manual
                                            </span>
                                            <span className="font- text-sm text-neutral">
                                                4 downloads
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="prose max-w-full m-8 ">
                <h2>Introduction</h2>
                <ReactMarkdown
                    className="overflow-scroll"
                    remarkPlugins={[remarkGfm]}
                >
                    {product.description}
                </ReactMarkdown>
                {/* <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                /> */}
                <hr />
                <h2>Specifications</h2>
                {/* <div
                    id="specifications"
                    dangerouslySetInnerHTML={{ __html: product.specifications }}
                /> */}
                <ReactMarkdown
                    className="overflow-scroll"
                    remarkPlugins={[remarkGfm]}
                >
                    {product.specifications}
                </ReactMarkdown>
            </div>
        </main>
    );
}
