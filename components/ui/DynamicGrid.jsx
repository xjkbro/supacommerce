import { supabaseCDN } from "@/lib/supabase-cdn";
import { arbritraryArray } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DynamicGrid({ items }) {
    // const arr = [...items, ...arbritraryArray(3)];

    const grid = ["", "col-span-2", "row-span-2"];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2  grid-flow-row-dense auto-rows-fr">
            {items.map((item) => {
                const rand = Math.floor(Math.random() * 3);
                return (
                    <Link
                        href={"/categories/" + (item.slug ?? "")}
                        key={item.id}
                        className={
                            "card w-full bg-base-100 shadow-xl image-full " +
                            grid[rand]
                        }
                    >
                        {/* <figure>
                            <Image
                                className="w-full object-contain rounded-lg shadow-2xl"
                                width={200}
                                height={200}
                                priority
                                alt={item.title}
                                src={supabaseCDN(
                                    "categories",
                                    item.slug + ".png"
                                )}
                            />
                        </figure> */}
                        <div className="card-body">
                            <h2 className="card-title">
                                {item.title ?? "Lorem Ipsum"}
                            </h2>
                            <p>
                                {item?.short_description ??
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nesciunt commodi voluptatum eaque. Incidunt minus, harum velit quam nostrum sunt nemo."}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
