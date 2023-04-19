import Link from "next/link";
import React from "react";

export default function NotFound() {
    return (
        <main class="h-[93vh] w-full flex flex-col justify-center items-center bg-secondary">
            <h1 class="text-9xl font-extrabold text-white tracking-widest">
                404
            </h1>
            <div class="bg-accent px-2 text-sm rounded rotate-12  -translate-y-8 sticky text-base-100">
                Not Found
            </div>
            <small className="text-base-100">
                Looks like we don&apos;t have that product.
            </small>
            <Link href="/" class="mt-5 btn btn-accent text-base-100">
                Go Home
            </Link>
        </main>
    );
}
