import ProductGrid from "./ProductGrid";

// do not cache this page
export const revalidate = 0;

export default async function Products({ searchParams }) {
    const page = searchParams.page ? searchParams.page : 0;

    return (
        <div>
            <ProductGrid page={page} />
        </div>
    );
}
