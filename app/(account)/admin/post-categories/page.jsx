import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
export const revalidate = 0;

export default async function PostCategories() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: postCategory } = await supabase
        .from("post_category")
        .select("*");
    return (
        <div className="prose w-full">
            {postCategory.map((item) => (
                <ul key={item.slug}>
                    <li>
                        <Link href={`/admin/post-categories/${item.id}`}>
                            {item.title}
                        </Link>
                    </li>
                </ul>
            ))}
        </div>
    );
}
