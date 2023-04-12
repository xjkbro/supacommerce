"use client";
import React, { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function Thanks({ searchParams }) {
    const { clearCart } = useShoppingCart();
    const [sessionID, setSessionID] = useState("");
    useEffect(() => {
        clearCart();
        setSessionID(searchParams.session_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(sessionID);

    return <div onClick={clearCart}>thank-you</div>;
}
