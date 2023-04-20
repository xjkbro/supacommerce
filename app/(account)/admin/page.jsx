import LineChart from "@/components/ui/admin/LineChart";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React from "react";
// export const revalidate = 0;

const data = ["Contact Form", "EZ Data Logger", "Quotation"];
export default async function Admin() {
    return (
        <>
            {/* <h1 className="text-3xl font-bold ml-4">Admin Dashboard</h1>
            <hr className="mb-4 mt-2" /> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="stats shadow-md border border-base-200 hover:-translate-y-1 transition-all">
                    <div className="stat">
                        <div className="stat-title uppercase font-semibold text-sm">
                            Traffic
                        </div>
                        <div className="stat-value ">19,400</div>
                        <div className="stat-desc text-error">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 inline mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                                />
                            </svg>
                            21% lower than last month
                        </div>
                    </div>
                </div>
                <div className="stats shadow-md border border-base-200 hover:-translate-y-1 transition-all">
                    <div className="stat">
                        <div className="stat-title uppercase font-semibold text-sm">
                            New Leads
                        </div>
                        <div className="stat-value">320</div>
                        <div className="stat-desc text-success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 inline mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                />
                            </svg>
                            25% more than last month
                        </div>
                    </div>
                </div>
                <div className="stats shadow-md border border-base-200 hover:-translate-y-1 transition-all">
                    <div className="stat">
                        <div className="stat-title uppercase font-semibold text-sm">
                            Sales
                        </div>
                        <div className="stat-value">72</div>
                        <div className="stat-desc text-success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 inline mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                />
                            </svg>
                            13% more than last month
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card w-full h-96 bg-base-100 shadow-md border border-base-200 hover:-translate-y-1 transition-all">
                    <div className="card-body">
                        <h2 className="card-title">Most Recent Leads</h2>
                        <div className="h-full">
                            {/* {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="flex justify-between"
                                >
                                    <span>John Doe</span>
                                    <span>jdoe@acme.com</span>
                                    <span>Acme</span>
                                </div>
                            ))} */}

                            <table className="table table-compact w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="rounded-none uppercase">
                                            Name
                                        </th>
                                        <th className="rounded-none uppercase">
                                            Email
                                        </th>
                                        <th className="rounded-none uppercase">
                                            Company
                                        </th>
                                        <th className="rounded-none uppercase">
                                            From
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <tr key={item}>
                                            <td>John Doe</td>
                                            <td>jdoe@acme.com</td>
                                            <td>Acme</td>
                                            <th>{data[item % 3]}</th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">
                                View more
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card w-full h-96 bg-base-100 shadow-md border border-base-200 hover:-translate-y-1 transition-all">
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
                            <button className="btn btn-primary">
                                View More
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card w-full h-96 bg-base-100 shadow-md border border-base-200 hover:-translate-y-1 transition-all">
                    <div className="card-body">
                        <h2 className="card-title">Overview</h2>
                        <LineChart />
                        <div className="card-actions justify-end"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
