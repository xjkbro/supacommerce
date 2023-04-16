"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import Link from "next/link";
import Image from "next/image";

export default function CategoryMenu() {
    const { supabase } = useSupabase();
    const [topLevel, setTopLevel] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategories() {
            let { data: categories } = await supabase
                .from("categories")
                .select("id, name, parent");
            let { data: topLevel } = await supabase
                .from("categories")
                .select("id, name, parent")
                .is("parent", null);

            setTopLevel(topLevel);
            setCategories(categories);
        }
        getCategories();
    }, [supabase]);

    const recursiveCat = (topCat) => {
        const filtered = categories.filter((cat) => cat.parent == topCat.id);

        if (filtered.length == 0) return <></>;
        else
            return (
                <ul className="menu bg-base-100 w-fit p-0 z-10">
                    {filtered.map((children) => {
                        const childfilter = categories.filter(
                            (cat) => cat.parent == children.id
                        );
                        if (childfilter.length == 0)
                            return (
                                <li key={children.name}>
                                    <Link href={`/categories/${children.id}`}>
                                        {children.name}
                                    </Link>
                                </li>
                            );
                        else
                            return (
                                // <ul
                                //     className="menu bg-base-100 w-fit z-10"
                                //     key={children.name}
                                // >
                                <li>
                                    <Link href={`/categories/${children.id}`}>
                                        {children.name}
                                    </Link>
                                    {recursiveCat(children)}
                                </li>
                                // </ul>
                            );
                    })}
                </ul>
            );
    };

    return (
        <>
            {topLevel?.map((item) => (
                <li key={item.id}>
                    <Link href={"/categories/" + item.id}>{item.name}</Link>
                    {recursiveCat(item)}
                </li>
            ))}
        </>
    );
    return (
        <ul className="menu bg-base-100 w-fit p-2 z-10">
            {topLevel?.map((item) => (
                <li key={item.id}>
                    <Link href={"/category/" + item.id}>{item.name}</Link>
                </li>
            ))}
        </ul>
    );
}
