import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
export default async function Categories() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: categories } = await supabase
        .from("categories")
        .select("id, name, parent");
    let { data: topLevel } = await supabase
        .from("categories")
        .select("id, name, parent")
        .is("parent", null);

    console.log("=========================");

    const recursiveCat = (topCat) => {
        const filtered = categories.filter((cat) => cat.parent == topCat.id);

        if (filtered.length == 0) return <></>;
        else
            return (
                <ul className="m-2 pl-8 p-2">
                    {filtered.map((children) => {
                        const childfilter = categories.filter(
                            (cat) => cat.parent == children.id
                        );
                        if (childfilter.length == 0)
                            return (
                                <li key={children.name}>
                                    <Link
                                        href={`/admin/categories/${children.id}`}
                                    >
                                        {children.name}
                                    </Link>
                                </li>
                            );
                        else
                            return (
                                <ul className="" key={children.name}>
                                    <li>
                                        <Link
                                            href={`/admin/categories/${children.id}`}
                                        >
                                            {children.name}
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
        <div className="w-11/12 mx-auto my-12">
            {topLevel.map((topCat) => (
                <ul key={topCat.name}>
                    <li>
                        <Link href={`/admin/categories/${topCat.id}`}>
                            {topCat.name}
                        </Link>
                    </li>
                    {recursiveCat(topCat)}
                </ul>
            ))}
        </div>
    );
}
