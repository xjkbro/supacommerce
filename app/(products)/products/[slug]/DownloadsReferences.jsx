"use client";
import { useState, useEffect } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import Link from "next/link";
import { fileTypeOptions } from "@/lib/admin-constants";

export default function DownloadsReferences({ productDownloads }) {
    const { supabase } = useSupabase();
    const [downloads, setDownloads] = useState([]);

    useEffect(() => {
        async function getDownloads() {
            productDownloads.map(async (download) => {
                let { data } = await supabase
                    .from("downloads")
                    .select("*")
                    .eq("id", download.download_id)
                    .single();
                // data.download_id = download_id;
                console.log(data);
                setDownloads([...downloads, data]);
            });
        }
        getDownloads();
        console.log(downloads);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {downloads.map((item) => {
                if (item.file == "") return <></>;
                return (
                    <Link
                        href={`https://anyzlthrxmlnduuesdhk.supabase.co/storage/v1/object/public/downloads/${item.id}/${item.file}`}
                        // href={"/"}
                        key={item.id}
                        target="__blank"
                        className="flex gap-2 items-center bg-[#f4f4f4] p-2 rounded-md"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                            />
                        </svg>
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-sm ">
                                {fileTypeOptions.map((type) =>
                                    type.value == item.type ? type.name : ""
                                )}
                                {/* {item.name ? item.name : "User Manual"} */}
                            </span>
                            <span className="font- text-sm text-neutral">
                                4 downloads
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
