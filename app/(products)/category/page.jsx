import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";

export default async function Category() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: categories, error } = await supabase
        .from("categories")
        .select("id, name, description, parent")
        .is("parent", null);

    console.log(categories);
    return (
        <main>
            hi
            {categories.map((cat) => (
                <div key={cat.id} className="p-2 shadow-md w-96">
                    <Link href={"/category/" + cat.id}>{cat.name}</Link>
                    <br />
                    <small>{cat.description}</small>
                </div>
            ))}
        </main>
    );
}
