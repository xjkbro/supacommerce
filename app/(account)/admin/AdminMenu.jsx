"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminMenu() {
    const path = usePathname();
    const adminNav = [
        { name: "User Dashboard", path: "/admin" },
        { name: "Products", path: "/admin/products" },
        { name: "Categories", path: "/admin/categories" },
        { name: "Posts", path: "/admin/posts" },
        { name: "Post Categories", path: "/admin/post-categories" },
        { name: "Videos", path: "/admin/videos" },
        { name: "Video Categories", path: "/admin/video-categories" },
        { name: "Webinars", path: "/admin/webinars" },
        { name: "Downloads", path: "/admin/downloads" },
        { name: "Orders", path: "/admin/orders" },
        { name: "Users", path: "/admin/users" },
    ];
    return (
        <ul className="menu w-64 bg-base-100 text-base-content text-sm">
            {adminNav.map((item, i) => (
                <li className={path == item.path && "bordered"} key={i}>
                    <Link className="flex justify-between" href={item.path}>
                        {item.name}
                        <Link
                            href={item.path + "/add"}
                            className="rounded-full w-6 h-6 outline outline-base-300 text-base-300 flex justify-center items-center hover:bg-accent hover:text-base-100 hover:outline-base-100 transition-all"
                        >
                            +
                        </Link>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
