import { arbritraryArray } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DynamicGrid({ items }) {
    // const arr = [...items, ...arbritraryArray(3)];

    const grid = ["", "col-span-2", "row-span-2"];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 grid-flow-row-dense">
            {items.map((item) => {
                const rand = Math.floor(Math.random() * 3);
                return (
                    <Link
                        href={"/category/" + (item.id ?? "")}
                        key={item.id}
                        className={
                            "card w-full bg-base-100 shadow-xl image-full " +
                            grid[rand]
                        }
                    >
                        <figure>
                            <Image
                                className="w-full object-contain rounded-lg shadow-2xl"
                                width={200}
                                height={200}
                                alt="item"
                                src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {item.name ?? "Lorem Ipsum"}
                            </h2>
                            <p>
                                {item?.description ??
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nesciunt commodi voluptatum eaque. Incidunt minus, harum velit quam nostrum sunt nemo."}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
