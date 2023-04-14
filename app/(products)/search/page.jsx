"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSupabase } from "@/components/providers/supabase-provider";

export default function Search() {
    const { supabase } = useSupabase();
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    console.log(search);
    const [query, setQuery] = useState(search ? search : "");
    const [queriedSearch, setQueriedSearch] = useState([]);

    useEffect(() => {
        async function getQuery() {
            let { data: q, error: currentError } = await supabase
                .from("products")
                .select("id, title, slug, short_description, price")
                .textSearch("title", `${search}`)
                .eq("visible", true);
            console.log(q);
            setQueriedSearch(q);
        }
        getQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <div>
            {console.log(queriedSearch)}
            <pre>{JSON.stringify(queriedSearch, null, 2)}</pre>
        </div>
        // <>

        //     <>
        //         <div>Search Query: {query}</div>
        //         {queriedSearch.length > 0 ? (
        //             <div className="overflow-x-auto container mx-auto my-2">
        //                 <table className="table w-full">
        //                     <thead>
        //                         <tr>
        //                             <th>
        //                                 <label>
        //                                     <input
        //                                         type="checkbox"
        //                                         className="checkbox"
        //                                     />
        //                                 </label>
        //                             </th>
        //                             <th>Name</th>
        //                             <th>Description</th>
        //                             <th>Price</th>
        //                             <th>View</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         {queriedSearch.map((prod) => (
        //                             <>
        //                                 <tr key={prod?.id}>
        //                                     <th>
        //                                         <label>
        //                                             <input
        //                                                 type="checkbox"
        //                                                 className="checkbox"
        //                                             />
        //                                         </label>
        //                                     </th>
        //                                     <td>
        //                                         <Link
        //                                             className=" flex gap-2"
        //                                             href={
        //                                                 "/products/" +
        //                                                 prod?.slug
        //                                             }
        //                                         >
        //                                             <div className="flex items-center space-x-3">
        //                                                 <span className="avatar">
        //                                                     <div className="mask mask-squircle w-12 h-12">
        //                                                         <Image
        //                                                             width={500}
        //                                                             height={500}
        //                                                             alt="cat"
        //                                                             priority
        //                                                             src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
        //                                                         />
        //                                                     </div>
        //                                                 </span>
        //                                             </div>
        //                                             <div>
        //                                                 <div className="font-bold">
        //                                                     {prod?.title}
        //                                                 </div>
        //                                                 <div className="text-sm opacity-50">
        //                                                     {prod?.slug}
        //                                                 </div>
        //                                             </div>
        //                                         </Link>
        //                                     </td>
        //                                     <td className="!w-96 whitespace-normal">
        //                                         {prod?.short_description.substr(
        //                                             0,
        //                                             100
        //                                         )}
        //                                     </td>
        //                                     <td>{prod?.price}</td>
        //                                     <th>
        //                                         <Link
        //                                             href={
        //                                                 "/products/" +
        //                                                 prod?.slug
        //                                             }
        //                                             className="btn btn-ghost btn-xs"
        //                                         >
        //                                             Details
        //                                         </Link>
        //                                     </th>
        //                                 </tr>
        //                             </>
        //                         ))}
        //                     </tbody>
        //                     <tfoot>
        //                         <tr>
        //                             <th></th>
        //                             <th>Name</th>
        //                             <th>Job</th>
        //                             <th>Favorite Color</th>
        //                             <th></th>
        //                         </tr>
        //                     </tfoot>
        //                 </table>
        //             </div>
        //         ) : (
        //             <></>
        //         )}
        //     </>
        // </>
    );
}
