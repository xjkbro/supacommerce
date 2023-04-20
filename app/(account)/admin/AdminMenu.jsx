"use client";
import { adminRoutes } from "@/lib/admin-constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminMenu() {
    const path = usePathname();

    return (
        <ul className="menu w-64 bg-base-100 text-base-content text-sm">
            {adminRoutes.map((item, i) => (
                <li className={path == item.path ? "bordered" : ""} key={i}>
                    <div className="flex justify-between">
                        <Link
                            prefetch={false}
                            className="w-full"
                            href={item.path}
                        >
                            {item.name}
                        </Link>
                        <Link
                            prefetch={false}
                            href={item.path + "/add"}
                            className={
                                (item.path == "/admin" && "hidden") +
                                " rounded-full min-w-[1.5rem] min-h-[1.5rem] outline outline-base-300 text-base-300 flex justify-center items-center hover:bg-accent hover:text-base-100 hover:outline-base-100 transition-all"
                            }
                        >
                            +
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}
