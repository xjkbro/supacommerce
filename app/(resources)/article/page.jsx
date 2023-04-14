import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Article() {
    const arr = Array.from(Array(10).keys());
    return (
        <div className="md:grid grid-cols-3 mx-auto w-11/12 md:w-3/4 my-12 gap-4">
            <div className="col-span-1 space-y-2">
                <div className="card w-full bg-base-100 shadow-xl">
                    <ul className="menu bg-base-100 w-full p-2 rounded-box">
                        <li className="menu-title">
                            <span>Category</span>
                        </li>
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                        <li className="menu-title">
                            <span>Category</span>
                        </li>
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
                <div className="card w-full bg-base-100 shadow-xl">
                    <ul className="menu bg-base-100 w-full p-2 rounded-box">
                        <li className="menu-title">
                            <span>Category</span>
                        </li>
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                        <li className="menu-title">
                            <span>Category</span>
                        </li>
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className=" col-span-2 flex flex-col gap-4">
                {arr.map((item) => (
                    <Link
                        key={item}
                        className="hover:bg-base-200 transition-all p-4 grid md:grid-cols-4 grid-cols-1 gap-2"
                        href={"/article/" + item}
                    >
                        <div className="md:w-42 md:h-42 object-cover col-span-1">
                            <Image
                                width={150}
                                height={150}
                                alt="cat"
                                className="w-full md:w-42 md:h-42 object-cover"
                                src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                            />
                        </div>
                        <div className="co-span-1 md:col-span-3">
                            <h2 className="text-2xl font-bold">Some Title</h2>
                            <p className="font-light">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Odit, aspernatur. Ab, placeat
                                numquam. Perferendis quo molestias amet ea et.
                                Earum repellendus odio asperiores ut accusantium
                                obcaecati, sequi exercitationem ad inventore!
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
