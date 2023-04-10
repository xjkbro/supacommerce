import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function SingleArticle() {
    const str = `
# QuickCommerce

A quick ecommerce site that I whipped up to test the capabilites to scale a large B2B ecommerce site with Nextjs, TailwindCSS, Prisma, MySQL, and Stripe from a standard PHP, HTML, CSS, JS and jQuery website. I was really happy with the result and how fast I did it. Now to use this approach for the B2B site.
## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## Appendix

Any additional information goes here

`;
    return (
        <div className="grid grid-cols-3 mx-auto w-3/4 mt-12">
            <div className=" col-span-1 justify-center">
                <Link className="flex gap-2 justify-center" href="/article">
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
                    className="h-96 object-cover rounded-xl"
                />
                <ReactMarkdown>{str}</ReactMarkdown>
            </div>
        </div>
    );
}
