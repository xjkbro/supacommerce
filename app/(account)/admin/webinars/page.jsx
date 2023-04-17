import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
export const revalidate = 0;

export default async function Webinars() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: webinars } = await supabase.from("webinars").select("*");
    return (
        <div>
            {webinars.map((item) => (
                <div key={item.id}>
                    <Link href={"/admin/webinars/" + item.id}>
                        {item.title}
                    </Link>
                </div>
            ))}
        </div>
    );
}
