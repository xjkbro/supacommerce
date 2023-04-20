"use client";
// import { CartProvider } from "use-shopping-cart";

import dynamic from "next/dynamic";

const { CartProvider } = dynamic(() => import("use-shopping-cart"), {
    loading: () => <p>Loading ...</p>,
});
export default function StripeProvider({ children }) {
    return (
        <CartProvider
            mode="payment"
            cartMode="checkout-session"
            stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            currency="USD"
        >
            {children}
        </CartProvider>
    );
}
