import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import { notFound, useRouter, usePathname } from "next/navigation";
import React from "react";
import AdminMenu from "./AdminMenu";

export default async function AdminLayout({ children }) {
    // const path = usePathname();
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    // const router = useRouter()

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
        .from("users")
        .select("id,role")
        .eq("user_id", user?.id)
        .single();

    if (data?.role != "admin") notFound();

    // console.log(user)
    return (
        <div className="block md:col-span-1 h-[93vh]">
            <div className="drawer drawer-mobile md:h-[93vh]">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col items-center py-8">
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-primary drawer-button lg:hidden"
                    >
                        Open drawer
                    </label>
                    {children}
                </div>
                <div className="drawer-side shadow-md">
                    <label
                        htmlFor="my-drawer-2"
                        className="drawer-overlay"
                    ></label>
                    <AdminMenu />
                </div>
            </div>
            {/* <ul className="menu bg-base-100 w-full m-auto p-2 rounded-box shadow-md ">
                    <li>
                        <Link href="/admin">User Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/admin/products">Products</Link>
                    </li>
                    <li>
                        <Link href="/admin/categories">Categories</Link>
                    </li>
                    <li>
                        <Link href="/admin/users">Users</Link>
                    </li>
                    <li>
                        <Link href="/admin/orders">Orders</Link>
                    </li>
                    <li>
                        <Link href="/admin/posts">Posts</Link>
                    </li>
                    <li>
                        <Link href="/admin/videos">Videos</Link>
                    </li>
                    <li>
                        <Link href="/admin/webinars">Webinars</Link>
                    </li>
                    <li>
                        <Link href="/admin/downloads">Downloads</Link>
                    </li>
                </ul>
            </div>
            <div className="md:col-span-5 h-[90vh] w-full overflow-scroll">
                {children}
            </div> */}
        </div>
    );
}
