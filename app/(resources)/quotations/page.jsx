"use client";
import { useShoppingCart } from "use-shopping-cart";
import { filterCartItems } from "@/lib/stripe-helpers";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import QuickAdd from "./QuickAdd";
import Form from "./Form";

export default function Cart() {
    const {
        clearCart,
        totalPrice,
        incrementItem,
        decrementItem,
        setItemQuantity,
        removeItem,
        cartDetails,
    } = useShoppingCart();
    console.log(Object.values(cartDetails));

    const [showResults, setShowResults] = useState(false);
    const [liveSearch, setLiveSearch] = useState([]);
    const { supabase } = useSupabase();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const { data } = await supabase
                .from("products")
                .select("title,slug,short_description, price, image")
                .order("title", { ascending: false });

            if (data) setProducts(data);
        }
        getProducts();
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
        <main className="bg-base-100 shadow-lg md:border border-base-200 w-11/12 md:w-3/4 my-12 rounded-xl mx-auto md:y-12">
            <div className="w-11/12 mx-auto ">
                {/* Breadcrumb */}
                <div className="m-2">
                    <div className="text-sm breadcrumbs p-2">
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/quotations/">Quotations</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="my-4">
                    <h1 className="text-3xl font-bold">Quotation Center</h1>
                    <p>
                        Please add items to your list and enter your name and
                        details to generate your quote
                    </p>
                </div>
                {/* Quick Add */}
                <QuickAdd />
                <div className="pb-4">
                    {Object.values(cartDetails).length > 0 ? (
                        <>
                            <div className=" w-full pb-8">
                                <table className="hidden md:table w-full ">
                                    <thead className="text-center">
                                        <tr>
                                            <th className="!bg-primary text-white uppercase !rounded-none text-left">
                                                Product
                                            </th>
                                            <th className="!bg-primary text-white uppercase !rounded-none">
                                                Quantity
                                            </th>
                                            <th className="!bg-primary text-white uppercase !rounded-none">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.values(cartDetails).map(
                                            (item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="avatar">
                                                                <div className="w-12 h-12">
                                                                    <Image
                                                                        src={
                                                                            item.image
                                                                        }
                                                                        alt={
                                                                            item.name
                                                                        }
                                                                        width={
                                                                            100
                                                                        }
                                                                        height={
                                                                            100
                                                                        }
                                                                        className="w-12 h-12 !object-contain"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">
                                                                    {item.name}
                                                                </div>
                                                                <div className="text-sm opacity-50 whitespace-normal">
                                                                    {item.description.substring(
                                                                        0,
                                                                        120
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="form-control w-56 mx-auto">
                                                        <div className="input-group">
                                                            <button
                                                                onClick={() =>
                                                                    decrementItem(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="btn btn-square btn-primary "
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className="w-full text-center"
                                                                value={
                                                                    item.quantity
                                                                }
                                                            />
                                                            <button
                                                                onClick={() =>
                                                                    incrementItem(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="btn btn-square btn-primary "
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                removeItem(
                                                                    item.id
                                                                )
                                                            }
                                                            className="btn btn-outline btn-secondary mt-2"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                    <td>
                                                        {item.formattedValue}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <div className="flex md:hidden flex-col gap-8 w-full">
                                    {Object.values(cartDetails).map((item) => (
                                        <div
                                            className=" flex flex-col gap-2 "
                                            key={item.id}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="w-12 h-12">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={100}
                                                            height={100}
                                                            className="w-12 h-12 !object-contain"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        {item.description.substring(
                                                            0,
                                                            120
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                Total: {item.formattedValue}
                                            </div>

                                            <div className="form-control w-full">
                                                <div className="input-group">
                                                    <button
                                                        onClick={() =>
                                                            decrementItem(
                                                                item.id
                                                            )
                                                        }
                                                        className="btn btn-square btn-primary "
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="w-full text-center"
                                                        value={item.quantity}
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            incrementItem(
                                                                item.id
                                                            )
                                                        }
                                                        className="btn btn-square btn-primary "
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="btn btn-outline btn-secondary mt-2"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-56 bg-base-200 text-sm">
                            No items in cart to create a quote
                        </div>
                    )}
                </div>
                <Form />
            </div>
        </main>
    );
}
