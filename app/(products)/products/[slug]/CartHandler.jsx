"use client";
import React, { useState } from "react";
import BuyNow from "../BuyNow";
import AddToCart from "../AddToCart";
import Link from "next/link";

export default function CartHandler({ product }) {
    const [quantity, setQuantity] = useState(1);
    const maxQty = Array.from(Array(20).keys());
    return (
        <>
            <div className="flex gap-2 flex-wrap w-full">
                <select
                    className="select select-bordered w-24"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                    {maxQty.map((item, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <BuyNow product={product} quantity={quantity} />
                <AddToCart product={product} quantity={quantity} />
                <Link href="/" className="btn btn-outline btn-accent">
                    Add To Quote
                </Link>
            </div>
        </>
    );
}
