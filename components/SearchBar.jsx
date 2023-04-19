"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSupabase } from "./providers/supabase-provider";
import { useRouter } from "next/navigation";
import Image from "next/image";

import useSWR from "swr";
const fetcher = (url) =>
    fetch(url, { method: "GET" }).then((res) => res.json());

export default function SearchBar() {
    const router = useRouter();
    const [showResults, setShowResults] = useState(false);
    const [liveSearch, setLiveSearch] = useState([]);
    const searchForm = useRef();
    const { supabase } = useSupabase();
    // const [products, setProducts] = useState([]);

    const { data: products, error } = useSWR("api/products", fetcher);

    useEffect(() => {
        // async function getProducts() {
        //     const { data } = await supabase
        //         .from("products")
        //         .select("title,slug,short_description, image")
        //         .order("title", { ascending: false });
        //     // console.log(data);
        //     if (data) setProducts(data);
        // }
        // getProducts();
        // console.log(products);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const filterSearch = (e) => {
        if (e.target.value.length > 0) {
            var wordList = products.filter((elem, index) =>
                elem.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            // console.log(wordList);
            // console.log(result);
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
                    // console.log(e.target[0].value);
                    router.push("/search?search=" + e.target[0].value);
                }}
                className="form-control menu relative md:w-[30vw]"
            >
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-full focus:outline-none"
                        onChange={filterSearch}
                        onFocus={() => setShowResults(true)}
                        onBlur={() => {
                            setTimeout(() => setShowResults(false), 300);
                        }}
                    />
                    <button className="btn btn-square btn-accent text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </div>
                {showResults ? (
                    <ul className="menu fixed top-[4rem] bg-base-100 md:w-[30vw] p-2 shadow-sm rounded-box flex-nowrap h-fit max-h-[50vh] overflow-y-scroll">
                        {liveSearch.length > 0 ? (
                            <>
                                {liveSearch.slice(0, 10).map((item, i) => (
                                    <li key={i}>
                                        <Link
                                            href={"/products/" + item.slug}
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
                                            <div>
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
                                        </Link>
                                    </li>
                                ))}
                            </>
                        ) : (
                            <li>No Results</li>
                        )}
                    </ul>
                ) : (
                    <></>
                )}
            </form>
        </>
    );
}
