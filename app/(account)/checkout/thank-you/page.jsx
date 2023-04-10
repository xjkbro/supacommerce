"use client";
import React from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function ThankYou({ params }) {
    const { clearCart } = useShoppingCart();
    if (params?.order == "completed") {
        console.log("hi");
        clearCart();
    }
    return <div onClick={clearCart}>thank-you</div>;
}
