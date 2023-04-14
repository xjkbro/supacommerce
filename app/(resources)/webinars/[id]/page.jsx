import Image from "next/image";
import Link from "next/link";
import React from "react";

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default async function Webinar({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    let { data: webinar } = await supabase
        .from("webinars")
        .select("*")
        .eq("id", params.id)
        .single();
    return (
        <div className="md:grid grid-cols-3 mx-auto w-11/12 md:w-3/4 my-12">
            <div className=" col-span-1 justify-center">
                <Link
                    className="flex gap-2 mb-4 md:justify-center"
                    href="/webinars"
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
            <div className=" col-span-2 prose">
                <Image
                    src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
                    alt="feature"
                    width={800}
                    height={600}
                    className="h-96 object-cover"
                />
                <h1 className="text-3xl font-bold">{webinar.title}</h1>
                <small>Published Date: </small>
                {/* <ReactMarkdown>{str}</ReactMarkdown> */}
                <div>{webinar.description}</div>
            </div>
        </div>
    );
}
