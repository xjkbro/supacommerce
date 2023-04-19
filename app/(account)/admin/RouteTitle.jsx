"use client";
import React from "react";
import { adminRoutes } from "@/lib/admin-constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RouteTitle() {
    const path = usePathname();
    // console.log(path);
    const title = adminRoutes.filter((item) => item.path == path);
    if (title.length > 0)
        return (
            <>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold ml-4">
                        {title[0]?.name}
                    </h1>
                    <Link href={path + "/add"} className="btn btn-primary">
                        Add
                    </Link>
                </div>
                <hr className="mb-4 mt-2" />
            </>
        );
    else return <></>;
}
