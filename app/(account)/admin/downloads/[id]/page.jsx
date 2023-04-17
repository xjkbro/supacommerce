import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { headers, cookies } from "next/headers";
import DownloadForm from "./DownloadForm";
// import { v4 as uuidv4 } from "uuid";
export const revalidate = 0;

export default async function EditDownload({ params }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const { data: download } = await supabase
        .from("downloads")
        .select("*")
        .eq("id", params.id)
        .single();
    const { data: products } = await supabase
        .from("products")
        .select("id, title");

    const { data: downloadToProducts } = await supabase
        .from("product_downloads")
        .select("*")
        .eq("download_id", download.id);

    const { data: bucket } = await supabase.storage
        .from("downloads")
        .list(`${params.id}`, {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
        });

    // const selectedProducts = [...products]
    const selected = downloadToProducts.map((item) => {
        return products.filter((prod) => prod.id == item.product_id)[0];
    });
    console.log(selected);
    return (
        <div>
            {/* <br /> */}
            {/* <pre>{JSON.stringify(bucket, null, 2)}</pre> */}
            <DownloadForm
                products={products}
                download={download}
                bucket={bucket}
                prodSelected={selected}
                downloadToProducts={downloadToProducts}
            />
        </div>
    );
}
