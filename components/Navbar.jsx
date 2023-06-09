"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import LongLogo from "./ui/LongLogo";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useShoppingCart } from "use-shopping-cart";
import { filterCartItems } from "@/lib/stripe-helpers";
import SearchBar from "@/components/SearchBar";
import CategoryMenu from "./menus/CategoryMenu";
import SquareLogo from "./ui/SquareLogo";
import SoftwareMenu from "./menus/SoftwareMenu";
import SolutionsMenu from "./menus/SolutionsMenu";
import ResourcesMenu from "./menus/ResourcesMenu";

export default function NavBar({ user }) {
    const { supabase } = useSupabase();
    const path = usePathname();
    const router = useRouter();
    const [userRole, setUserRole] = useState("user");
    const [overlay, setOverlay] = useState(false);
    const {
        redirectToCheckout,
        cartCount,
        clearCart,
        totalPrice,
        cartDetails,
    } = useShoppingCart();

    useEffect(() => {
        async function getRole() {
            const { data } = await supabase
                .from("users")
                .select("id,role")
                .eq("user_id", user?.id)
                .single();
            setUserRole(data?.role);
        }
        if (user) getRole();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    async function handleCartCheckout(event) {
        event.preventDefault();
        const response = await fetch("/api/checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filterCartItems(cartDetails)),
        })
            .then((res) => res.json())
            .catch((error) => {
                /* Error handling */
            });
        // console.log(response);
        redirectToCheckout(response.id);
    }

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        router.refresh();
    };
    if (path == "/login" || path == "/register") return <></>;
    return (
        <>
            <div className="hidden md:navbar  bg-[#ffffff45] hover:bg-white transition-all backdrop-blur-lg backdrop-brightness-125 backdrop-contrast-51 backdrop-saturate-150 shadow-xl z-[29] sticky top-0">
                <div className="flex-1">
                    <Link aria-label="Hompage Link to our Logo" href="/">
                        <LongLogo className="w-48 h-12" />
                        {/* <SquareLogo className="w-12 h-12" /> */}
                    </Link>
                    <ul className="menu menu-horizontal z-20 text-sm">
                        <li>
                            <Link href="/categories">Products</Link>
                            <ul
                                id="category-menu"
                                className="menu bg-base-100 w-fit z-10"
                            >
                                <CategoryMenu />
                                <li>
                                    <Link prefetch={false} href="/products">
                                        New Products
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        prefetch={false}
                                        href="/products/sale"
                                    >
                                        On Sale
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        prefetch={false}
                                        href="/products/phased-out"
                                    >
                                        Phased Out Items
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link prefetch={false} href="/categories/software">
                                Software
                            </Link>
                            <SoftwareMenu />
                        </li>
                        <li>
                            <Link prefetch={false} href="/solutions">
                                Solutions
                            </Link>
                            <SolutionsMenu />
                        </li>
                        <li>
                            <Link prefetch={false} href="/posts">
                                Resources
                            </Link>
                            <ResourcesMenu />
                        </li>
                    </ul>
                </div>
                <div className="flex-none gap-2">
                    <SearchBar />
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
                                <span className="badge badge-sm badge-accent text-white indicator-item">
                                    {cartCount}
                                </span>
                            </div>
                        </label>
                        <div
                            tabIndex={0}
                            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                        >
                            <div className="card-body">
                                <span className="font-bold text-lg">
                                    {cartCount} Items
                                </span>
                                <span className="text-info">
                                    Subtotal: ${(totalPrice / 100).toFixed(2)}
                                </span>
                                <div className="card-actions">
                                    {cartCount > 0 ? (
                                        <>
                                            <button
                                                onClick={handleCartCheckout}
                                                className="btn btn-primary btn-block"
                                            >
                                                Checkout
                                            </button>
                                            <Link
                                                href="/checkout"
                                                className="btn btn-primary btn-block"
                                            >
                                                View Cart
                                            </Link>
                                            <button
                                                onClick={clearCart}
                                                className="btn btn-primary btn-outline btn-block"
                                            >
                                                Clear Cart
                                            </button>
                                        </>
                                    ) : (
                                        <></>
                                    )}
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
                                            ? user?.user_metadata?.avatar ??
                                              "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
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
                                    <a className="disabled hover:bg-transparent font-semibold">
                                        Hello {user?.user_metadata?.first_name}!
                                    </a>
                                </li>
                                <li>
                                    <Link href="/account">Account</Link>
                                </li>
                                {userRole == "admin" ? (
                                    <li>
                                        <Link prefetch={false} href="/admin">
                                            Dashboard
                                        </Link>
                                    </li>
                                ) : (
                                    <></>
                                )}
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
