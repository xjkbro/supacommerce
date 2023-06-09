import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import PostForm from "../PostForm";

export const revalidate = 0;

export default async function AddPost() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: categories } = await supabase
        .from("post_category")
        .select("title,id");

    return (
        <div>
            <PostForm categories={categories} />
        </div>
    );
}
