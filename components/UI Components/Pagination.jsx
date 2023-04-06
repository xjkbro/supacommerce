"use client";
import { useRouter } from "next/router";
import React from "react";

export const getPagination = (page, size) => {
    const limit = size ? size : 3;
    const from = page ? page * limit : 0;
    const to = page ? from + size : size;

    return { from, to };
};

export default function Pagination({ path, page }) {
    const router = useRouter();
    return (
        <div>
            <button onClick={() => router.push(`/${path}?page=${page - 1}`)}>
                Prev
            </button>
            <button onClick={() => router.push(`/${path}?page=${page + 1}`)}>
                Next
            </button>
        </div>
    );
}
