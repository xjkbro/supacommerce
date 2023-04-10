import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import CategoryHeader from "../CategoryHeader";

export default async function SingleCategory({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    // const { data } = await supabase.from("categories").select("*");

    let { data: category, error: currentError } = await supabase
        .from("categories")
        .select("id, name, description, parent")
        .eq("id", params.id)
        .single();

    let { data: children, error: childrenError } = await supabase
        .from("categories")
        .select("id, name, description, parent")
        .eq("parent", params.id);
    let { data: products, error: productsError } = await supabase
        .from("product_to_category")
        .select(
            `
            id,
            product_id (
            id, title, slug, short_description, price 
            )
        `
        )
        .eq("category_id", params.id);

    // console.log(category);
    console.log(products);
    return (
        <main>
            <CategoryHeader category={category} />

            <hr />

            {/* <div className="w-full flex justify-center">
                <ul className="menu menu-horizontal bg-base-100 rounded-box m-8 mx-auto shadow-xl">
                    {children.map((cat) => (
                        <li key={cat.id} className="">
                            <Link href={"/category/" + cat.id}>{cat.name}</Link>
                            <br />
                        </li>
                    ))}
                </ul>
            </div> */}
            <div className="p-2 md:p-0 grid grid-cols-1 md:grid-cols-3 w-3/4 mt-12 mx-auto gap-2">
                {children.map((cat) => (
                    <Link
                        href={"/category/" + cat.id}
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
                                // src="https://images.unsplash.com/photo-1659460542526-35b3257e1152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{cat.name}</h2>
                            <p>
                                {cat?.description?.length != 0
                                    ? cat.description
                                    : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nesciunt commodi voluptatum eaque. Incidunt minus, harum velit quam nostrum sunt nemo."}
                            </p>
                            <div className="card-actions justify-end">
                                {/* <button className="btn btn-primary">
                                    View
                                </button> */}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <hr />

            {/*  */}
            {products.length > 0 ? (
                <div className="overflow-x-auto  w-3/4 mt-12 mx-auto my-2">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                        />
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {products.map(({ product_id: prod }) => (
                                <>
                                    <tr key={prod.id}>
                                        <th>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                />
                                            </label>
                                        </th>
                                        <td>
                                            <Link
                                                className=" flex gap-2"
                                                href={"/products/" + prod.slug}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <Image
                                                                width={500}
                                                                height={500}
                                                                alt="cat"
                                                                priority
                                                                src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                                                                // src="https://images.unsplash.com/photo-1659460542526-35b3257e1152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80"
                                                            />
                                                        </div>
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {prod.title}
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        {prod.slug}
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="!w-96 whitespace-normal">
                                            {prod.short_description.substr(
                                                0,
                                                100
                                            )}
                                        </td>
                                        <td>{prod.price}</td>
                                        <th>
                                            <Link
                                                href={"/products/" + prod.slug}
                                                className="btn btn-ghost btn-xs"
                                            >
                                                Details
                                            </Link>
                                        </th>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <></>
            )}
        </main>
    );
}
