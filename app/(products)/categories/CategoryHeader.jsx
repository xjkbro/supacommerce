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
        if (category != null) {
            getParent();
        }
    });
    return (
        <div className="hero min-h-[24rem] max-h-[24rem] bg-secondary text-white">
            <div className="hero-content flex-col lg:flex-row">
                {!hideImage ? (
                    <Image
                        className="w-fit rounded-lg"
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
            </div>
        </div>
    );
}
