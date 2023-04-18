import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export default async function SingleArticle({ params }) {
    //     const str = `
    // # QuickCommerce

    // A quick ecommerce site that I whipped up to test the capabilites to scale a large B2B ecommerce site with Nextjs, TailwindCSS, Prisma, MySQL, and Stripe from a standard PHP, HTML, CSS, JS and jQuery website. I was really happy with the result and how fast I did it. Now to use this approach for the B2B site.
    // ## Acknowledgements

    //  - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
    //  - [Awesome README](https://github.com/matiassingers/awesome-readme)
    //  - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

    // ## Appendix

    // Any additional information goes here

    // `;
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    let { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", params.slug)
        .single();
    return (
        <div className="md:grid grid-cols-3 mx-auto w-11/12 md:w-3/4 my-12">
            <div className=" col-span-1 justify-center">
                <Link
                    className="flex gap-2 mb-4 md:justify-center"
                    href="/article"
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
                    src={`https://anyzlthrxmlnduuesdhk.supabase.co/storage/v1/object/public/posts/${post.slug}.png`}
                    alt="feature"
                    width={800}
                    height={600}
                    className="h-96 object-cover"
                />
                <small>
                    Published Date: {Date(post.created_at.toString())}
                </small>
                {/* <ReactMarkdown>{str}</ReactMarkdown> */}
                <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </div>
    );
}
