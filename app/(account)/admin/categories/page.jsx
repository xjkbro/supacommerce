import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
export const revalidate = 0;

export default async function Categories() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: categories } = await supabase
        .from("categories")
        .select("id, title, parent");
    let { data: topLevel } = await supabase
        .from("categories")
        .select("id, title, parent")
        .is("parent", null);

    console.log("=========================");

    const recursiveCat = (topCat) => {
        const filtered = categories.filter((cat) => cat.parent == topCat.id);

        if (filtered.length == 0) return <></>;
        else
            return (
                <ul className="">
                    {filtered.map((children) => {
                        const childfilter = categories.filter(
                            (cat) => cat.parent == children.id
                        );
                        if (childfilter.length == 0)
                            return (
                                <li key={children.title}>
                                    <Link
                                        href={`/admin/categories/${children.id}`}
                                    >
                                        {children.title}
                                    </Link>
                                </li>
                            );
                        else
                            return (
                                <ul className="" key={children.title}>
                                    <li>
                                        <Link
                                            href={`/admin/categories/${children.id}`}
                                        >
                                            {children.title}
                                        </Link>
                                    </li>
                                    {recursiveCat(children)}
                                </ul>
                            );
                    })}
                </ul>
            );
    };

    return (
        <div className="prose w-full">
            {topLevel.map((topCat) => (
                <ul key={topCat.title}>
                    <li>
                        <Link href={`/admin/categories/${topCat.id}`}>
                            {topCat.title}
                        </Link>
                    </li>
                    {recursiveCat(topCat)}
                </ul>
            ))}
        </div>
    );
}
