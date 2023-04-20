"use client";

import Link from "next/link";
import { useState } from "react";

export default function PostsTable({ posts }) {
    const [allPosts, setAllPosts] = useState(posts);

    return (
        <>
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th className="rounded-none bg-primary text-white">
                            Title
                        </th>
                        <th className="rounded-none bg-primary text-white">
                            Type
                        </th>
                        <th className="rounded-none bg-primary text-white">
                            Published Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allPosts.map((item) => {
                        return (
                            <tr className="text-sm" key={item.id}>
                                <td>
                                    <Link
                                        prefetch={false}
                                        className="font-bold"
                                        href={"/admin/posts/" + item.id}
                                    >
                                        {item.title}
                                    </Link>
                                </td>
                                <td>{item.category.title}</td>
                                <td>
                                    {new Date(item.created_at).toDateString()}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
