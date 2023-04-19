import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import CategoryHeader from "./CategoryHeader";
export const revalidate = 0;

export default async function Category() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: categories, error } = await supabase
        .from("categories")
        .select("id, title, slug, short_description, parent")
        .is("parent", null);

    return (
        <main>
            <CategoryHeader />

            <hr />
            <div className="p-2 md:p-0 grid grid-cols-1 md:grid-cols-3 w-11/12 md:w-3/4 my-12 mx-auto gap-2">
                {categories.map((cat) => (
                    <Link
                        href={"/categories/" + cat.slug}
                        key={cat.id}
                        className="card w-full bg-base-100 shadow-xl image-full"
                    >
                        <figure>
                            <Image
                                className="w-full rounded-lg shadow-2xl"
                                width={500}
                                height={500}
                                alt="cat"
                                priority
                                src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{cat.title}</h2>
                            <p>
                                {cat?.short_description?.length != 0
                                    ? cat.short_description
                                    : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nesciunt commodi voluptatum eaque. Incidunt minus, harum velit quam nostrum sunt nemo."}
                            </p>
                            <div className="card-actions justify-end"></div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
