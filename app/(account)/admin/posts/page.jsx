import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";

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
    return (
        <div>
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th className="rounded-none bg-primary text-white">
                            Title
                        </th>
                        <th className="rounded-none bg-primary text-white">
                            Type
                        </th>
                        <th className="rounded-none bg-primary text-white">
                            Published Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((item) => {
                        return (
                            <tr className="text-sm" key={item.id}>
                                <td>
                                    <Link
                                        className="font-bold"
                                        href={"/admin/posts/" + item.id}
                                    >
                                        {item.title}
                                    </Link>
                                </td>
                                <td>{item.category}</td>
                                <td>
                                    {new Date(item.created_at).toDateString()}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
