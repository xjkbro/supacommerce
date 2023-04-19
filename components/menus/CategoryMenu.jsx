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
                .select("id, title, slug, parent");
            let { data: topLevel } = await supabase
                .from("categories")
                .select("id, title,slug, parent")
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
                                <li key={children.title}>
                                    <Link href={`/categories/${children.slug}`}>
                                        {children.title}
                                    </Link>
                                </li>
                            );
                        else
                            return (
                                <li>
                                    <Link href={`/categories/${children.slug}`}>
                                        {children.title}
                                    </Link>
                                    {recursiveCat(children)}
                                </li>
                            );
                    })}
                </ul>
            );
    };

    return (
        <>
            {topLevel?.map((item) => (
                <li key={item.id}>
                    <Link href={"/categories/" + item.slug}>{item.title}</Link>
                    {recursiveCat(item)}
                </li>
            ))}
        </>
    );
}
