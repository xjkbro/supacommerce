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
    return (
        <div>
            {/* {posts.map((item) => (
                <Link key={item.slug}>{item.title}</Link>
            ))} */}

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
                    {posts.map((item) => (
                        <tr className="text-sm" key={item.id}>
                            <td>
                                <Link
                                    className="font-bold"
                                    href={"/admin/posts/" + item.id}
                                >
                                    {item.title}
                                </Link>
                            </td>
                            <td>{item.title}</td>
                            <td>{Date(item.created_at).toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
