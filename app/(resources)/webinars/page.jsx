import { arbritraryArray } from "@/lib/utils";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function Webinars() {
    const arr = arbritraryArray(10);
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    let { data: webinars } = await supabase.from("webinars").select("*");
    return (
        <div className="w-11/12 md:w-3/4 mx-auto my-4">
            <div className="my-8">
                <h1 className="text-3xl font-bold">Webinars</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[...webinars, ...arr].map((item) => (
                    <div
                        key={item}
                        className="card w-full bg-base-100 shadow-xl"
                    >
                        <div className="card-body">
                            <h2 className="card-title">
                                {item?.title ? item.title : "Lorem Ipsum"}
                            </h2>
                            <small>
                                Date: {new Date(item.date).toDateString()} at
                                10:00AM
                            </small>
                            <p className="prose">
                                If a dog chews shoes whose shoes does he choose?
                                <ul>
                                    <li>list1</li>
                                    <li>list2</li>
                                    <li>list3</li>
                                    <li>list4</li>
                                </ul>
                            </p>
                            <div className="card-actions justify-end">
                                <Link
                                    href={
                                        "/videos/" + (item?.id ? item.id : "")
                                    }
                                    className="btn btn-accent btn-outline"
                                >
                                    Watch
                                </Link>
                                <Link
                                    href={
                                        "/webinars/" + (item?.id ? item.id : "")
                                    }
                                    className="btn btn-primary"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
