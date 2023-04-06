import Navbar from "@/components/Navbar";
import Button from "@/components/UI Components/Button";
import Pagination, {
    getPagination,
} from "@/components/UI Components/Pagination";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import ProductGrid from "./ProductGrid";

// do not cache this page
export const revalidate = 0;

export default async function Products({ searchParams }) {
    const page = searchParams.page ? searchParams.page : 0;
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div>
            <Navbar user={user} />
            <ProductGrid page={page} />
        </div>
    );
}
