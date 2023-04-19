import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React from "react";
export const revalidate = 0;

export default async function Admin() {
    return (
        <>
            {/* <h1 className="text-3xl font-bold ml-4">Admin Dashboard</h1>
            <hr className="mb-4 mt-2" /> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="stats shadow-md border border-base-200">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">
                            21% more than last month
                        </div>
                    </div>
                </div>
                <div className="stats shadow-md border border-base-200">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">
                            21% more than last month
                        </div>
                    </div>
                </div>
                <div className="stats shadow-md border border-base-200">
                    <div className="stat">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">
                            21% more than last month
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card w-full h-96 bg-base-100 shadow-md border border-base-200">
                    <div className="card-body">
                        <h2 className="card-title">Most Recent Leads</h2>
                        <div className="h-full">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="flex justify-between"
                                >
                                    <span>John Doe</span>
                                    <span>jdoe@acme.com</span>
                                    <span>Acme</span>
                                </div>
                            ))}
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">
                                View more
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card w-full h-96 bg-base-100 shadow-md border border-base-200">
                    <div className="card-body">
                        <h2 className="card-title">Top Downloads</h2>
                        <div className="h-full">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="flex justify-between"
                                >
                                    <span>Item {item}</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card w-full h-96 bg-base-100 shadow-md border border-base-200">
                    <div className="card-body">
                        <h2 className="card-title">Overview</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
