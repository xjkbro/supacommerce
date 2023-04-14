"use client";
import DynamicGrid from "@/components/ui/DynamicGrid";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const tabs = ["Subcategories", "Products", "More Details"];

export default function CategoryTabs({ category, subcategories, products }) {
    // const tabs = ["Subcategories", "Products", "More Details"];
    const tabs = [];
    if (subcategories.length > 0) tabs.push("Subcategories");
    if (products.length > 0) tabs.push("Products");
    tabs.push("More Details");

    const [active, setActive] = useState(0);

    return (
        <div>
            <div className="tabs mb-4 w-full">
                {tabs.map((tab, i) => (
                    <a
                        key={i}
                        className={
                            // "tab tab-lg tab-lifted " +
                            "tab tab-bordered text-3xl h-12 font-bold  " +
                            (i == active && "tab-active")
                        }
                        onClick={() => setActive(i)}
                    >
                        {tab}
                    </a>
                ))}
            </div>
            {tabs[active] == "Subcategories" && (
                <DynamicGrid items={subcategories} />
            )}
            {tabs[active] == "Products" && (
                <>
                    {products.length > 0 ? (
                        <>
                            <div className="overflow-x-auto my-2">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                    />
                                                </label>
                                            </th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(
                                            ({ product_id: prod }) => (
                                                <>
                                                    <tr key={prod.id}>
                                                        <th>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    className="checkbox"
                                                                />
                                                            </label>
                                                        </th>
                                                        <td>
                                                            <Link
                                                                className=" flex gap-2"
                                                                href={
                                                                    "/products/" +
                                                                    prod.slug
                                                                }
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <span className="avatar">
                                                                        <div className="mask mask-squircle w-12 h-12">
                                                                            <Image
                                                                                width={
                                                                                    500
                                                                                }
                                                                                height={
                                                                                    500
                                                                                }
                                                                                alt="cat"
                                                                                priority
                                                                                src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                                                                            />
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">
                                                                        {
                                                                            prod.title
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm opacity-50">
                                                                        {
                                                                            prod.slug
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </td>
                                                        <td className="!w-96 whitespace-normal">
                                                            {prod.short_description.substr(
                                                                0,
                                                                100
                                                            )}
                                                        </td>
                                                        <td>{prod.price}</td>
                                                        <th>
                                                            <Link
                                                                href={
                                                                    "/products/" +
                                                                    prod.slug
                                                                }
                                                                className="btn btn-ghost btn-xs"
                                                            >
                                                                Details
                                                            </Link>
                                                        </th>
                                                    </tr>
                                                </>
                                            )
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Job</th>
                                            <th>Favorite Color</th>
                                            <th></th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </>
                    ) : (
                        <>No Products</>
                    )}
                </>
            )}
            {tabs[active] == "More Details" && (
                <p>
                    {category.description > 0 ? (
                        category.description
                    ) : (
                        <>Some Details</>
                    )}
                </p>
            )}
        </div>
    );
}
