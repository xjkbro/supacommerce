import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import { notFound, useRouter, usePathname } from "next/navigation";
import React from "react";
import AdminMenu from "./AdminMenu";
import { adminRoutes } from "@/lib/admin-constants";
import RouteTitle from "./RouteTitle";

import "react-quill/dist/quill.snow.css";

export const revalidate = 0;

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
                <div className="drawer-content w-11/12 mx-auto py-4">
                    <label
                        htmlFor="my-drawer-2"
                        className="w-full btn btn-accent btn-outline drawer-button lg:hidden"
                    >
                        Open Admin Drawer
                    </label>
                    <div className="w-full mx-auto my-4 border rounded-xl">
                        <div className="m-4">
                            <RouteTitle />
                            {children}
                        </div>
                    </div>
                </div>
                <div className="drawer-side shadow-md">
                    <label
                        htmlFor="my-drawer-2"
                        className="drawer-overlay"
                    ></label>
                    <AdminMenu />
                </div>
            </div>
        </div>
    );
}
