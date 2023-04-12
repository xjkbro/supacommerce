"use client";

import { useState } from "react";
import { DebugCart, useShoppingCart } from "use-shopping-cart";
import { filterCartItems } from "@/lib/stripe-helpers";

export default function BuyNow({ product, quantity }) {
    const { addItem, cartDetails, redirectToCheckout } = useShoppingCart();

    // console.log(product);
    const item = {
        name: product.title,
        description: product.short_description,
        id: product.id,
        price: product.price * 100,
        currency: "USD",
        image: product.image,
    };

    async function handleBuy(item) {
        // console.log(filterCartItems(cartDetails));

        const filtered = [
            {
                price_data: {
                    currency: "USD",
                    unit_amount: product.price * 100,
                    product_data: {
                        name: product.title,
                        description: product.short_description,
                        images: [product.image],
                    },
                },
                quantity,
            },
        ];
        // console.log(filtered);

        const response = await fetch("/api/checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filtered),
        })
            .then((res) => res.json())
            .catch((error) => {
                /* Error handling */
            });

        redirectToCheckout(response.id);
    }

    return (
        <>
            <button
                onClick={() => {
                    // addItem(item);
                    handleBuy(item);
                }}
                className="btn btn-secondary"
            >
                Buy Now
            </button>
        </>
    );
}
