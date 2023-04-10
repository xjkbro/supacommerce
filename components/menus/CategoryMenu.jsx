"use client";
import React, { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import Link from "next/link";
import Image from "next/image";

export default function CategoryMenu() {
    const { supabase } = useSupabase();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategories() {
            let { data, error: currentError } = await supabase
                .from("categories")
                .select("id, name")
                .is("parent", null);
            console.log({ hi: data });
            setCategories(data);
        }
        getCategories();
    }, [supabase]);

    return (
        <ul className="menu bg-base-100 w-fit p-2 z-10">
            {categories.map((item) => (
                <li key={item.id}>
                    <Link href={"/category/" + item.id}>{item.name}</Link>
                </li>
            ))}
        </ul>
    );
}
