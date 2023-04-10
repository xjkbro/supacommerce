import Link from "next/link";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Article() {
    const arr = ["1", "2", "3"];
    return (
        <div className="grid grid-col-1 mx-auto w-3/4 mt-12 gap-4">
            {arr.map((item) => (
                <Link
                    key={item}
                    className="w-full hover:bg-base-200 rounded-xl transition-all p-4"
                    href={"/article/" + item}
                >
                    <h2 className="text-2xl font-bold">Some Title</h2>
                    <p className="font-light">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Odit, aspernatur. Ab, placeat numquam. Perferendis
                        quo molestias amet ea et. Earum repellendus odio
                        asperiores ut accusantium obcaecati, sequi
                        exercitationem ad inventore!
                    </p>
                </Link>
            ))}
        </div>
    );
}
