import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryHeader({ category = null }) {
    return (
        <div className="hero min-h-1/2 bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <Image
                    className="w-96 rounded-lg shadow-2xl"
                    width={500}
                    height={500}
                    alt="cat"
                    priority
                    src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                />
                {/* <div>
                    <h1 className="text-5xl font-bold">Products</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                </div> */}
                <div>
                    <h1 className="text-5xl font-bold">
                        {category?.name ?? "Products"}
                    </h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                    {category != null && (
                        <Link
                            className="btn btn-accent text-white"
                            href={`/category/${category?.parent ?? ""}`}
                        >
                            Go back
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
