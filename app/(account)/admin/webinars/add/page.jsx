import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import WebinarForm from "./WebinarForms";

// do not cache this page
export const revalidate = 0;

export default async function Category() {
    // const page = searchParams.page ? searchParams.page : 0;
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: webinars, error } = await supabase.from("webinars").select("*");
    return (
        <div>
            <WebinarForm webinars={webinars} />
        </div>
    );
}
