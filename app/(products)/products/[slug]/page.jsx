import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function SingleProduct({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: product, error: currentError } = await supabase
        .from("products")
        .select()
        .eq("slug", params.slug)
        .single();

    let { data: belongsTo, error: productsError } = await supabase
        .from("product_to_category")
        .select(
            `
            id,
            category_id (
            id, name
            )
        `
        )
        .eq("product_id", product.id);

    console.log(belongsTo);
    // console.log(product.id);
    return (
        <main>
            {/* cats:
            {belongsTo.map(({ category_id: c }) => (
                <Link key={c.id} href={"/category/" + c.id}>
                    {c.name}
                </Link>
            ))} */}
            <hr />
            <div className="hero min-h-1/2 bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <Image
                        className="w-48 rounded-lg shadow-2xl"
                        width={500}
                        height={500}
                        alt="cat"
                        priority
                        src={product.image}
                    />
                    <div>
                        <div>
                            {belongsTo.map(({ category_id: c }) => (
                                <Link
                                    key={c.id}
                                    className="badge"
                                    href={"/category/" + c.id}
                                >
                                    {c.name}
                                </Link>
                            ))}
                        </div>
                        <h1 className="text-5xl font-bold">{product.name}</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <Link href="/" className="btn">
                            Add To Cart
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
            <div className="w-2/3 mx-auto">
                <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />
            </div>
        </main>
    );
}
