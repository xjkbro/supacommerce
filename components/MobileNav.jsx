import React from "react";
import LongLogo from "./ui/LongLogo";
import Link from "next/link";
import Logo from "../public/supacommerce-long.svg";
import Image from "next/image";

export default function MobileNav({ children, user }) {
    return (
        <div className="drawer">
            <input
                id="my-drawer"
                type="checkbox"
                className="md:hidden drawer-toggle"
            />
            <div className="drawer-content">
                <div className="md:hidden flex justify-between h-16 items-center shadow-md mx-auto">
                    <Link name="Logo" href="/">
                        {/* <LongLogo className="w-48 h-12" /> */}
                        <Image
                            src={Logo}
                            width={150}
                            alt="logo"
                            className="m-4"
                        />
                    </Link>
                    <label htmlFor="my-drawer" className="drawer-button m-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </label>
                </div>
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <li className="menu-title">
                        <span>Products</span>
                    </li>
                    <li>
                        <Link href="/products">All Products</Link>
                    </li>
                    <li>
                        <Link href="/products">New Products</Link>
                    </li>
                    <li>
                        <Link href="/products">Phased Out Products</Link>
                    </li>
                    <li className="menu-title">
                        <span>Categories</span>
                    </li>
                    <li>
                        <Link href="/products">New Products</Link>
                    </li>
                    <li className="menu-title">
                        <span>Resources</span>
                    </li>
                    <li>
                        <Link href="/articles">Articles</Link>
                    </li>
                    <li>
                        <Link href="/webinars">Webinars</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
