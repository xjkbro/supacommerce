import Link from "next/link";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Article() {
    const arr = ["1", "2", "3"];
    return (
        <div className="md:grid grid-cols-3 mx-auto w-11/12 md:w-3/4 my-12 gap-2">
            <div className=" col-span-2 flex flex-col gap-4">
                {arr.map((item) => (
                    <Link
                        key={item}
                        className="hover:bg-base-200 rounded-xl transition-all p-4"
                        href={"/article/" + item}
                    >
                        <h2 className="text-2xl font-bold">Some Title</h2>
                        <p className="font-light">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Odit, aspernatur. Ab, placeat numquam.
                            Perferendis quo molestias amet ea et. Earum
                            repellendus odio asperiores ut accusantium
                            obcaecati, sequi exercitationem ad inventore!
                        </p>
                    </Link>
                ))}
            </div>
            <div className="col-span-1">
                <div className="card w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
