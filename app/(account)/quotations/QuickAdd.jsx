"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

export default function QuickAdd() {
    const router = useRouter();
    const [showResults, setShowResults] = useState(false);
    const [liveSearch, setLiveSearch] = useState([]);
    const searchForm = useRef();
    const { supabase } = useSupabase();
    const [products, setProducts] = useState([]);
    const { addItem } = useShoppingCart();

    useEffect(() => {
        async function getProducts() {
            const { data } = await supabase
                .from("products")
                .select("title,slug,short_description,price, image")
                .order("title", { ascending: false });

            // console.log(data);
            if (data) setProducts(data);
        }
        getProducts();
        // console.log(products);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const filterSearch = (e) => {
        if (e.target.value.length > 0) {
            var wordList = products.filter((elem, index) =>
                elem.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setLiveSearch(wordList);
        } else {
            setLiveSearch([]);
        }
    };
    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="form-control menu relative w-full mb-2"
            >
                <label className="input-group">
                    <span className="whitespace-nowrap text-white bg-primary">
                        Quick Add
                    </span>
                    <input
                        type="text"
                        placeholder="Search for an item..."
                        className="input input-bordered w-full"
                        onChange={filterSearch}
                        onFocus={() => setShowResults(true)}
                        onBlur={() => {
                            setTimeout(() => setShowResults(false), 300);
                        }}
                    />
                </label>
            </form>
            {showResults ? (
                <ul className="menu bg-base-100 border border-base-200 w-full my-2 p-2 shadow-sm rounded-box flex-nowrap h-fit max-h-[30vh] overflow-y-scroll">
                    {liveSearch.length > 0 ? (
                        <>
                            {liveSearch.slice(0, 10).map((item, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => {
                                            addItem({
                                                name: item.title,
                                                description:
                                                    item.short_description,
                                                id: item.id,
                                                price: item.price * 100,
                                                currency: "USD",
                                                image: item.image,
                                            });
                                        }}
                                        className="flex gap-2"
                                    >
                                        <div className="">
                                            {/* <Image
                                                    src={item.image}
                                                    width={32}
                                                    height={32}
                                                    alt={item.title}
                                                /> */}
                                        </div>
                                        <div className="text-left">
                                            <div>{item.title}</div>
                                            <div>
                                                {item.short_description
                                                    ? item?.short_description?.replace(
                                                          /(<([^>]+)>)/gi,
                                                          ""
                                                      )
                                                    : "No Description"}
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </>
                    ) : (
                        <li className="flex justify-center items-center h-full">
                            No Results
                        </li>
                    )}
                </ul>
            ) : (
                <></>
            )}
        </>
    );
}
