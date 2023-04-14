"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProductGrid({ products }) {
    const router = useRouter();
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

    const [checked, setChecked] = useState([]);
    const handleCheck = (e) => {
        let newArray = [...checked];
        newArray.push(e.target.value);

        if (checked.includes(e.target.value)) {
            newArray = newArray.filter((id) => id !== e.target.value);
        }
        setChecked(newArray);
    };
    const handleSearch = (e) => {
        // setFilteredProducts(
        //     products.filter((items) => items.title.includes(e.target.value))
        // );
        // console.log(filteredProducts);
        setPage(0);
        if (e.target.value.length > 0) {
            let wordList = products.filter((elem, index) =>
                elem.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            console.log(wordList);
            // console.log(result);
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

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedProducts?.map((item) => (
                            <tr key={item.slug} className="">
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
                                <td className="">
                                    <Link
                                        className=" flex  items-center gap-2  w-72"
                                        href={"/admin/products/" + item.id}
                                    >
                                        <div className="flex items-center space-x-3 h-full">
                                            <span className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    {/* <Image
                                                        width={500}
                                                        height={500}
                                                        alt="cat"
                                                        priority
                                                        src={item.image}
                                                    /> */}
                                                </div>
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-bold whitespace-normal">
                                                {item.title}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                {item.slug.length > 50
                                                    ? item.slug.substr(0, 50) +
                                                      "..."
                                                    : item.slug.substr(0, 50)}
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        className="w-full whitespace-normal"
                                        href={"/products/" + item.slug}
                                    >
                                        {item.short_description.substr(0, 100)}
                                    </Link>
                                </td>
                                <td className="text-right">
                                    ${item.price.toFixed(2)}
                                </td>
                                <td>
                                    {/* <AddToCart product={item} /> */}
                                    {/* <button className="btn btn-outline">
                                        Add To Cart
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th></th>
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
