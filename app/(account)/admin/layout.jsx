import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React from "react";

export default async function AdminLayout({ children }) {
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
        <div className="w-11/12 mx-auto mt-8 md:grid grid-cols-6 gap-8">
            <div className="hidden md:block md:col-span-1 h-[90vh]">
                <ul className="menu bg-base-100 w-full m-auto p-2 rounded-box shadow-md ">
                    <li>
                        <Link href="/admin">User Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/admin/products">Products</Link>
                    </li>
                    <li>
                        <Link href="/admin/Categories">Categories</Link>
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
                        <Link href="/admin/downloads">Downloads</Link>
                    </li>
                </ul>
            </div>
            <div className="md:col-span-5 h-[90vh] w-full overflow-scroll">
                {children}
            </div>
        </div>
    );
}
