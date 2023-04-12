import Link from "next/link";
import React from "react";

export default function DownloadsReferences() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5].map((item) => (
                <Link
                    href="/"
                    key={item}
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
                        <span className="font-bold text-sm ">User Manual</span>
                        <span className="font- text-sm text-neutral">
                            4 downloads
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
