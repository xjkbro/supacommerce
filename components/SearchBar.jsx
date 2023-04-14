"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSupabase } from "./providers/supabase-provider";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SearchBar() {
    const router = useRouter();
    const [showResults, setShowResults] = useState(false);
    const [liveSearch, setLiveSearch] = useState([]);
    const searchForm = useRef();
    const { supabase } = useSupabase();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const { data } = await supabase
                .from("products")
                .select("title,slug,short_description, image")
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
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered"
                    onChange={filterSearch}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => {
                        setTimeout(() => setShowResults(false), 300);
                    }}
                />
                {showResults ? (
                    <ul className="menu fixed top-[4rem] bg-base-100 md:w-[30vw] p-2 shadow-sm rounded-box flex-nowrap h-fit max-h-[50vh] overflow-scroll">
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
