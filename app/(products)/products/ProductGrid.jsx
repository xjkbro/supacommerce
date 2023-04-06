"use client";

import Pagination, {
    getPagination,
} from "@/components/UI Components/Pagination";
import Link from "next/link";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useEffect, useState } from "react";

import useSWR from "swr";
import { useRouter } from "next/navigation";

const fetcher = (url) =>
    fetch(url, { method: "GET" }).then((res) => res.json());

export default function ProductGrid({ page }) {
    const router = useRouter();
    const { from, to } = getPagination(page, 25);
    const { data: products, error } = useSWR(
        `api/products?from=${from}&to=${to}`,
        fetcher
    );
    const [checked, setChecked] = useState([]);
    const handleCheck = (e) => {
        // console.log(id);
        // let arr = [...checked];
        // // // console.log(arr);
        // console.log(arr);
        // if (arr.indexOf(e.target.value)) {
        //     arr.splice(arr.indexOf(e.target.value), 1);
        //     setChecked([...arr]);
        // } else {
        //     setChecked([...arr, e.target.value]);
        // }

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
            <div>Count: {products.length}</div>
            {/* <div className="flex flex-col gap-1">
                {" "}
                {products?.map((item) => (
                    <Link
                        className="w-full"
                        key={item.slug}
                        href={"https://icpdas-usa.com/" + item.slug}
                    >
                        {item.title}
                    </Link>
                ))}
            </div> */}

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
                        {products?.map((item) => (
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
                                <td>
                                    <Link
                                        className="w-full link link-primary"
                                        href={
                                            "https://icpdas-usa.com/" +
                                            item.slug
                                        }
                                    >
                                        {item.title.substr(0, 10)}
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        className="w-full"
                                        href={
                                            "https://icpdas-usa.com/" +
                                            item.slug
                                        }
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

            <div>
                <button
                    onClick={() =>
                        router.push(`/products?page=${parseInt(page) - 1}`)
                    }
                >
                    Prev
                </button>
                <button
                    onClick={() =>
                        router.push(`/products?page=${parseInt(page) + 1}`)
                    }
                >
                    Next
                </button>
            </div>
        </div>
    );
}
