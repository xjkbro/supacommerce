"use client";

import Pagination, {
    getPagination,
} from "@/components/UI Components/Pagination";
import Link from "next/link";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useEffect, useState } from "react";

import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

// const fetcher = (url) =>
//     fetch(url, { method: "GET" }).then((res) => res.json());

export default function ProductGrid({ products }) {
    // const searchParams = useSearchParams();
    const router = useRouter();
    // const page = searchParams.get("page") ? searchParams.get("page") : 0;
    const [page, setPage] = useState(0);

    // const { from, to } = getPagination(page, 25);
    // const [products, setProducts] = useState();
    const [pagedProducts, setPageProducts] = useState([]);
    useEffect(() => {
        console.log(products.slice(25 * page, 25 * (page + 1)));
        console.log(page);
        setPageProducts(products.slice(25 * page, 25 * (page + 1)));
    }, [page]);

    // const pageProducts = products.splice(1 * page, 25 * page);
    // setShowProducts( page

    // const { data: products, error } = useSWR(
    //     `api/products?from=${from}&to=${to}`,
    //     fetcher
    // );

    console.log(pagedProducts);

    const [checked, setChecked] = useState([]);
    const handleCheck = (e) => {
        let newArray = [...checked];
        newArray.push(e.target.value);

        console.log(newArray);

        if (checked.includes(e.target.value)) {
            newArray = newArray.filter((id) => id !== e.target.value);
        }
        setChecked(newArray);
    };
    if (!products) return <div>Loading...</div>;
    return (
        <div>
            <div className="btn-group flex justify-center my-4">
                <button
                    className="btn"
                    onClick={() =>
                        // router.push(`/products?page=${parseInt(page) - 1}`)
                        setPage(page - 1)
                    }
                >
                    Prev
                </button>
                <button
                    className="btn"
                    onClick={() =>
                        // router.push(`/products?page=${parseInt(page) + 1}`)
                        setPage(page + 1)
                    }
                >
                    Next
                </button>
            </div>

            <div className="overflow-x-auto mx-auto w-2/3">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Price</th>
                            <th>Add to Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedProducts?.map((item) => (
                            <tr key={item.slug}>
                                <th>
                                    <input
                                        type="checkbox"
                                        name={item.id}
                                        value={item.id}
                                        className="checkbox"
                                        onClick={handleCheck}
                                    />
                                    <label htmlFor={item.id}></label>
                                </th>
                                <td className="flex gap-2">
                                    <div className="mask mask-squircle w-8 h-8">
                                        <Image
                                            width={25}
                                            height={25}
                                            className="object-cover"
                                            alt="cat"
                                            src={item.image}
                                            // src="https://images.unsplash.com/photo-1659460542526-35b3257e1152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80"
                                        />
                                    </div>
                                    <Link
                                        className="w-full link link-primary"
                                        href={"/products/" + item.slug}
                                    >
                                        {item.title.substr(0, 10)}
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        className="w-full"
                                        href={"/products/" + item.slug}
                                    >
                                        {item.slug.substr(0, 25)}
                                    </Link>
                                </td>
                                <td>${item.price}</td>
                                <td>
                                    <a className="link">Add</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>company</th>
                            <th>company</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {/*
            <div className="btn-group flex justify-center my-4">
                <button
                    className="btn"
                    onClick={() =>
                        router.push(`/products?page=${parseInt(page) - 1}`)
                    }
                >
                    Prev
                </button>
                <button
                    className="btn"
                    onClick={() =>
                        router.push(`/products?page=${parseInt(page) + 1}`)
                    }
                >
                    Next
                </button>
            </div> */}
        </div>
    );
}
