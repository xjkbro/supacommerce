import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function SingleCategory({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    // const { data } = await supabase.from("categories").select("*");

    let { data: category, error: currentError } = await supabase
        .from("categories")
        .select("id, name, description, parent")
        .eq("id", params.id);

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
            id, title, slug, description, price 
            )
        `
        )
        .eq("category_id", params.id);

    // console.log(category);
    console.log(products);
    return (
        <main>
            <div className="hero min-h-1/2 bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    {/* <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
                    <Image
                        className="max-w-sm rounded-lg shadow-2xl"
                        width={500}
                        height={500}
                        alt="cat"
                        priority
                        src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                        // src="https://images.unsplash.com/photo-1659460542526-35b3257e1152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">
                            {category[0].name}
                        </h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <Link
                            class="btn btn-primary"
                            href={`/category/${category[0].parent ?? ""}`}
                        >
                            Go back
                        </Link>
                    </div>
                </div>
            </div>

            <hr />

            <div className="w-full flex justify-center">
                <ul className="menu menu-horizontal bg-base-100 rounded-box m-8 mx-auto shadow-xl">
                    {children.map((cat) => (
                        <li key={cat.id} className="">
                            <Link href={"/category/" + cat.id}>{cat.name}</Link>
                            <br />
                            {/* <small>{cat.description}</small> */}
                        </li>
                    ))}
                </ul>
            </div>

            <hr />

            {/*  */}
            {products.length > 0 ? (
                <div className="overflow-x-auto container mx-auto my-2">
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
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th></th>
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
                                            <div className="flex items-center space-x-3">
                                                <Link
                                                    href={
                                                        "/products/" + prod.slug
                                                    }
                                                    className="avatar"
                                                >
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
                                                </Link>
                                            </div>
                                            <div>
                                                <div className="font-bold">
                                                    {prod.title}
                                                </div>
                                                <div className="text-sm opacity-50">
                                                    {prod.slug}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {prod.description.substr(0, 100)}
                                        </td>
                                        <td>{prod.price}</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">
                                                details
                                            </button>
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
