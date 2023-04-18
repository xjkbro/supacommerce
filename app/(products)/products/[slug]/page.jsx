import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import ImageLayout from "./ImageLayout";
import CartHandler from "./CartHandler";
import JSONSpecificationTable from "@/components/ui/products/JSONSpecificationTable";
import DownloadsReferences from "./DownloadsReferences";

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
            id, name
            )
        `
        )
        .eq("product_id", product.id);

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
                                        {c.name}
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
                {/* Product Details */}
                {/* <div className="flex  flex-col lg:flex-row justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
                            <div className="carousel-item">
                                <Image
                                    className="w-32 h-32 md:w-96 md:h-96 object-contain bg-white rounded-xl"
                                    width={500}
                                    height={500}
                                    alt="cat"
                                    priority
                                    src={product.image}
                                />
                            </div>
                            <div className="carousel-item">
                                <Image
                                    className="w-32 h-32 md:w-96 md:h-96 object-contain bg-white rounded-xl"
                                    width={500}
                                    height={500}
                                    alt="cat"
                                    priority
                                    src={product.image}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 m-2">
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
                        <h1 className="text-5xl font-bold">{product.title}</h1>
                        <span className="text-4xl font-bold">
                            ${product.price}
                        </span>
                        <p className="py-6">{product.short_description}</p>
                        <div className="flex gap-2 flex-wrap w-full">
                            <Link href="/" className="btn btn-secondary">
                                Buy Now
                            </Link>
                            <Link href="/" className="btn btn-primary">
                                Add To Cart
                            </Link>
                            <Link
                                href="/"
                                className="btn btn-outline btn-accent"
                            >
                                Add To Quote
                            </Link>
                        </div>
                    </div>
                </div> */}
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
                            {/* <div className="flex gap-2 flex-wrap w-full">
                                <BuyNow product={product} />
                                <AddToCart product={product} />
                                <Link
                                    href="/"
                                    className="btn btn-outline btn-accent"
                                >
                                    Add To Quote
                                </Link>
                            </div> */}
                        </div>

                        <div className="my-2">
                            <h3 className="text-xl font-bold my-4">
                                Product Documentation & References
                            </h3>
                            <DownloadsReferences
                                productDownloads={productDownloads}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <h2 className="text-2xl font-bold m-4 text-center ">
                Introduction
            </h2>
            <div className="prose max-w-full m-8 ">
                {/* <ReactMarkdown
                    className="overflow-scroll"
                    remarkPlugins={[remarkGfm]}
                >
                    {product.description}
                </ReactMarkdown> */}
                <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />
            </div>
            <hr />
            <h2 className="text-2xl font-bold m-4 text-center ">
                Specifications
            </h2>
            <div className="max-w-full md:m-8">
                <JSONSpecificationTable data={product.json_specifications} />
            </div>
        </main>
    );
}
