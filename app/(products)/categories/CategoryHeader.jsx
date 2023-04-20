"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { supabaseCDN } from "@/lib/supabase-cdn";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CategoryHeader({ category = null }) {
    const { supabase } = useSupabase();
    const [parent, setParent] = useState(null);
    const [hideImage, setHideImage] = useState(false);
    const router = useRouter();
    useEffect(() => {
        async function getParent() {
            const { data } = await supabase
                .from("categories")
                .select("id,slug")
                .eq("id", category.parent)
                .single();
            setParent(data?.slug);
        }
        if (category?.parent != null) {
            getParent();
        }
    });
    return (
        <div className="text-white bg-gradient-to-r from-secondary to-primary py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 w-3/4 mx-auto items-center min-h-[20rem] md:max-h-[20rem] gap-4">
                <div className="col-span-1 md:col-span-2 order-2 md:order-1">
                    <h1 className="text-5xl font-bold">
                        {category?.title ?? "Products"}
                    </h1>
                    <p className="py-6">
                        {category?.short_description ??
                            `Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.`}
                    </p>
                    {category != null && (
                        <Link
                            className="btn btn-accent text-white"
                            href={`/categories/${parent ?? ""}`}
                        >
                            Go back
                        </Link>
                    )}
                </div>
                <div className="md:col-span-1 flex items-center justify-center order-1 md:order-2">
                    {!hideImage ? (
                        <Image
                            className="h-fit object-contain rounded-lg"
                            width={300}
                            height={300}
                            alt="cat"
                            priority
                            src={supabaseCDN(
                                "categories",
                                category?.slug + ".png"
                            )}
                            onError={() => {
                                setHideImage(true);
                            }}
                            // src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                        />
                    ) : (
                        <div className="w-96"></div>
                    )}
                </div>
            </div>
        </div>
    );
    return (
        <div className="hero min-h-[24rem] max-h-[24rem] bg-secondary text-white">
            <div className="hero-content flex-col lg:flex-row justify-between">
                <div className="md:w-2/3">
                    <h1 className="text-5xl font-bold">
                        {category?.title ?? "Products"}
                    </h1>
                    <p className="py-6">
                        {category?.short_description ??
                            `Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.`}
                    </p>
                    {category != null && (
                        <Link
                            className="btn btn-accent text-white"
                            href={`/categories/${parent ?? ""}`}
                        >
                            Go back
                        </Link>
                    )}

                    {/* {category != null && (
                        <button
                            className="btn btn-accent text-white"
                            onClick={() => router.back()}
                        >
                            Go back
                        </button>
                    )} */}
                </div>
                {!hideImage ? (
                    <Image
                        className="w-96 object-contain rounded-lg"
                        width={300}
                        height={300}
                        alt="cat"
                        priority
                        src={supabaseCDN("categories", category?.slug + ".png")}
                        onError={() => {
                            setHideImage(true);
                        }}
                        // src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                    />
                ) : (
                    <div className="w-96"></div>
                )}
            </div>
        </div>
    );
}
