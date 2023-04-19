import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import ImageLayout from "./ImageLayout";
import CartHandler from "./CartHandler";
import JSONSpecificationTable from "@/components/ui/products/JSONSpecificationTable";
import DownloadsReferences from "./DownloadsReferences";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function SingleProduct({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    let { data: product, error: currentError } = await supabase
        .from("products")
        .select("*")
        .eq("slug", params.slug)
        .single();

    if (!product) {
        notFound();
    }

    let { data: bucket, error: bucketError } = await supabase.storage
        .from("products")
        .list(`${product.id}`, {
            sortBy: { column: "name", order: "asc" },
        });

    let { data: productDownloads } = await supabase
        .from("product_downloads")
        .select("*")
        .eq("product_id", product.id);

    const prodImages = bucket.map((item) => {
        return `https://anyzlthrxmlnduuesdhk.supabase.co/storage/v1/object/public/products/${product.id}/${item.name}`;
    });

    let { data: belongsTo, error: productsError } = await supabase
        .from("product_to_category")
        .select(
            `
            id,
            category_id (
            id, title
            )
        `
        )
        .eq("product_id", product.id);
    console.log(product.json_specifications);
    return (
        <main className="bg-base-100 shadow-lg md:border border-base-200 w-11/12 md:w-3/4 my-12 rounded-xl mx-auto md:y-12">
            <div className="max-h-1/2 h-1/2 w-11/12 mx-auto mb-12">
                {/* Breadcrumb */}
                <div className="m-2">
                    <div className="text-sm breadcrumbs p-2">
                        {belongsTo.map(({ category_id: c }) => (
                            <ul key={c}>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/category/">Products</Link>
                                </li>
                                <li>
                                    <Link href={"/category/" + c.id}>
                                        {c.title}
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="flex  flex-col lg:flex-row md:items-center justify-between gap-4">
                    <ImageLayout product={product} images={prodImages} />

                    <div className="w-full md:w-1/2">
                        <div className="mb-2">
                            <div>
                                {belongsTo.map(({ category_id: c }) => (
                                    <Link
                                        key={c.id}
                                        className="badge"
                                        href={"/category/" + c.id}
                                    >
                                        New Product
                                    </Link>
                                ))}
                            </div>
                            <h1 className="text-5xl font-bold">
                                {product.title}
                            </h1>
                            <span className="text-4xl font-bold">
                                ${product.price}
                            </span>
                            <p className="py-6">{product.short_description}</p>
                            <CartHandler product={product} />
                        </div>

                        {productDownloads.length > 0 ? (
                            <div className="my-2">
                                <h3 className="text-xl font-bold my-4">
                                    Product Documentation & References
                                </h3>
                                <DownloadsReferences
                                    productDownloads={productDownloads}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>

            {product.description == "" ? (
                <></>
            ) : (
                <>
                    <hr />
                    <h2 className="text-2xl font-bold m-4 ml-8 ">
                        Product Description
                    </h2>
                    <div className="prose max-w-full m-8 ">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product.description,
                            }}
                        />
                    </div>
                </>
            )}

            {product?.json_specifications == "" ||
            product?.json_specifications == null ||
            JSON.stringify(product?.json_specifications) ==
                JSON.stringify([
                    { rows: [{ key: "", value: "" }], heading: "" },
                ]) ? (
                <></>
            ) : (
                <>
                    <hr />
                    <h2 className="text-2xl font-bold m-4 ml-8">
                        Specifications
                    </h2>
                    <div className="max-w-full md:m-8">
                        <JSONSpecificationTable
                            data={product.json_specifications}
                        />
                    </div>
                </>
            )}
        </main>
    );
}
