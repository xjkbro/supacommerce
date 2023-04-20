"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductTable({ products }) {
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(25);
    const [pagedProducts, setPageProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([...products]);
    useEffect(() => {
        setPageProducts(
            filteredProducts.slice(perPage * page, perPage * (page + 1))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredProducts, page, perPage]);

    const handleSearch = (e) => {
        setPage(0);
        if (e.target.value.length > 0) {
            let wordList = products.filter((elem, index) =>
                elem.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredProducts(wordList);
        } else {
            setFilteredProducts([...products]);
        }
    };

    return (
        <div className="mx-auto my-12">
            <div className="flex justify-between my-4">
                <div className=" flex items-center">
                    <div className="btn-group flex justify-center">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                page > 0 ? setPage(page - 1) : null
                            }
                        >
                            Prev
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                page < products.length / perPage - 1
                                    ? setPage(page + 1)
                                    : null
                            }
                        >
                            Next
                        </button>
                    </div>
                    <div className="flex items-center ml-4">
                        Showing {perPage * page} to {perPage * (page + 1)}
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link
                        prefetch={false}
                        className="btn btn-primary"
                        href="/admin/products/add"
                    >
                        New Product
                    </Link>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full min-w-96 mr-1"
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="">
                <table className="table table-compact table-zebra w-full">
                    <thead>
                        <tr>
                            <th className="rounded-none bg-primary text-white">
                                Name
                            </th>
                            <th className="rounded-none bg-primary text-white">
                                Visibility
                            </th>
                            <th className="rounded-none bg-primary text-white">
                                Availability
                            </th>
                            <th className="rounded-none bg-primary text-white">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedProducts?.map((item) => (
                            <tr key={item.slug} className="">
                                <td>
                                    <Link
                                        prefetch={false}
                                        className="w-full font-bold whitespace-normal"
                                        href={"/admin/products/" + item.id}
                                    >
                                        {item.title}
                                    </Link>
                                </td>
                                <td className="w-8">
                                    {item.visible ? "true" : "false"}
                                </td>
                                <td className="w-8">
                                    {item.available ? "true" : "false"}
                                </td>
                                <td className="w-12">
                                    ${item.price.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
