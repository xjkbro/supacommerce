import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import PostsTable from "./PostsTable";

export const revalidate = 0;

export default async function Categories() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: posts } = await supabase
        .from("posts")
        .select("id,title,created_at");
    let { data: categories } = await supabase
        .from("post_category")
        .select("title,id");
    let { data: postCategories } = await supabase
        .from("post_to_category")
        .select("*");

    const arr = posts.map((item) => {
        const postCategory = postCategories.filter(
            (x) => item.id == x.post_id
        )[0];
        const cat = categories.filter(
            (x) => x.id == postCategory.category_id
        )[0];
        return { ...item, category: cat.title };
    });
    console.log(arr);
    return (
        <div>
            <PostsTable posts={arr} />
        </div>
    );
}
