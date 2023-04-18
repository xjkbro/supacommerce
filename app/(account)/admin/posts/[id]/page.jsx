import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import PostForm from "../PostForm";

export const revalidate = 0;

export default async function EditPost({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .single();
    let { data: categories } = await supabase
        .from("post_category")
        .select("title,id");
    let { data: category } = await supabase
        .from("post_to_category")
        .select("*")
        .eq("post_id", params.id)
        .single();

    return (
        <div>
            <PostForm post={post} categories={categories} category={category} />
        </div>
    );
}
