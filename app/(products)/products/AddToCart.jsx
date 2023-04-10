"use client";

import { useState } from "react";
import { DebugCart, useShoppingCart } from "use-shopping-cart";

export default function AddToCart({ product }) {
    const { addItem } = useShoppingCart();
    const [toast, setToast] = useState(false);

    console.log(product);
    const item = {
        name: product.title,
        description: product.short_description,
        id: product.id,
        price: product.price * 100,
        currency: "USD",
        image: product.image,
    };

    return (
        <>
            <button
                onClick={() => {
                    addItem(item);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                }}
                className="btn btn-secondary"
            >
                Add to Cart
            </button>
            <div
                className={
                    " toast toast-top top-[4rem] toast-end z-50 transition-all  " +
                    (toast ? "translate-x-0" : "translate-x-[100rem]")
                }
            >
                <div className={"alert alert-success shadow-md"}>
                    <div>
                        <span>
                            Your {product.title} has been added to your cart.
                        </span>
                    </div>
                </div>
            </div>
            {/* <DebugCart /> */}
        </>
    );
}
