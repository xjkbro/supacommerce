"use client";
import { useShoppingCart } from "use-shopping-cart";
import { filterCartItems } from "@/lib/stripe-helpers";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
    const {
        redirectToCheckout,
        cartCount,
        clearCart,
        totalPrice,
        incrementItem,
        decrementItem,
        setItemQuantity,
        removeItem,
        cartDetails,
    } = useShoppingCart();
    console.log(Object.values(cartDetails));

    async function handleCartCheckout(event) {
        event.preventDefault();
        const response = await fetch("/api/checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filterCartItems(cartDetails)),
        })
            .then((res) => res.json())
            .catch((error) => {
                /* Error handling */
            });
        redirectToCheckout(response.id);
    }

    return (
        <main className="bg-base-100 shadow-lg md:border border-base-200 w-11/12 md:w-3/4 my-12 rounded-xl mx-auto md:y-12">
            <div className="w-11/12 mx-auto">
                {/* Breadcrumb */}
                <div className="m-2">
                    <div className="text-sm breadcrumbs p-2">
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/checkout/">Checkout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pb-4">
                    {Object.values(cartDetails).length > 0 ? (
                        <>
                            <div className="overflow-x-auto w-full pb-8">
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
                                                                <div className="mask mask-squircle w-12 h-12">
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
                                                    </td>
                                                    <td className="form-control w-56">
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
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={100}
                                                            height={100}
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

                            <div className="flex flex-wrap gap-2 my-4">
                                <button
                                    onClick={(e) => {
                                        // console.log(e.target.innerHTML);
                                        e.target.innerHTML = "loading...";
                                        handleCartCheckout(e);
                                    }}
                                    className="btn btn-primary  w-full md:w-fit"
                                >
                                    Checkout
                                </button>
                                <Link
                                    href="/quotations"
                                    // onClick={handleCartCheckout}
                                    className="btn btn-secondary btn-outline w-full md:w-fit"
                                >
                                    Request A Quote
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-56">
                            No items in cart
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
