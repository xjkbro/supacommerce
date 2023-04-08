"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import Image from "next/image";
import Link from "next/link";
import Button from "./UI Components/Button";
import LongLogo from "./UI Components/LongLogo";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar({ user }) {
    const { supabase } = useSupabase();
    const path = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        router.refresh();
        console.log(error);
    };
    // console.log(path);
    if (path == "/login" || path == "/register") return <></>;
    return (
        <>
            <div className="hidden md:navbar bg-base-100 z-10 ">
                <div className="flex-1">
                    {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
                    <Link href="/">
                        <LongLogo className="w-48 h-12" />
                    </Link>
                    <ul className="menu menu-horizontal z-20">
                        <li>
                            <Link href="/products">Products</Link>
                            <ul className="menu bg-base-100 w-56 p-2 z-10">
                                <li className="menu-title">
                                    <span>Category</span>
                                </li>
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 2</a>
                                </li>
                                <li className="menu-title">
                                    <span>Category</span>
                                </li>
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 2</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="/category">Categories</Link>
                            <ul className="menu bg-base-100 w-56 p-2 z-10">
                                <li className="menu-title">
                                    <span>Category</span>
                                </li>
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 2</a>
                                </li>
                                <li className="menu-title">
                                    <span>Category</span>
                                </li>
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 2</a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a>Posts</a>
                            <ul className="menu bg-base-100 w-56 p-2 z-10">
                                <li className="menu-title">
                                    <span>Category</span>
                                </li>
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 2</a>
                                </li>
                                <li className="menu-title">
                                    <span>Category</span>
                                </li>
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 2</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle"
                        >
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="badge badge-sm indicator-item">
                                    8
                                </span>
                            </div>
                        </label>
                        <div
                            tabIndex={0}
                            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                        >
                            <div className="card-body">
                                <span className="font-bold text-lg">
                                    8 Items
                                </span>
                                <span className="text-info">
                                    Subtotal: $999
                                </span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">
                                        View cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <Image
                                    src={
                                        user
                                            ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3276&q=80"
                                            : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
                                    }
                                    width={50}
                                    height={50}
                                    alt="avatar"
                                />
                            </div>
                        </label>
                        {!user ? (
                            <ul
                                tabIndex={0}
                                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <Link href="/login">Login</Link>
                                </li>
                                <li>
                                    <Link href="/register">Register</Link>
                                </li>
                            </ul>
                        ) : (
                            <ul
                                tabIndex={0}
                                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <Link className="disabled" href="/account">
                                        Hello {user.user_metadata.first_name}!
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account">Account</Link>
                                </li>
                                <li>
                                    <a onClick={handleSignOut}>Sign Out</a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
