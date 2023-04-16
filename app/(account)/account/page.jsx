import React from "react";
import Details from "./Details";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Account() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user?.role != "authenticated") notFound();
    return (
        <>
            <Details user={user} />
        </>
    );
}
