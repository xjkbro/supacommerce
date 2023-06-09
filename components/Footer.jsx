"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LongLogo from "@/components/ui/LongLogo";
import SquareLogo from "./ui/SquareLogo";
import { useShoppingCart } from "use-shopping-cart";

export default function Footer({ user }) {
    const { cartCount } = useShoppingCart();
    const path = usePathname();
    const arr = path.split("/");
    if (path == "/login" || path == "/register") return <></>;
    if (arr[1] == "admin") return <></>;
    return (
        <footer className="mt-24 md:mt-0">
            <div className="btm-nav md:hidden z-50">
                <Link href="/">
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
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                </Link>
                <Link href="/checkout">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
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
                </Link>

                <Link href="/account">
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
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                    </svg>
                </Link>
            </div>
            <div className="md:block hidden">
                <div className="footer grid-rows-2 p-10 bg-secondary text-neutral-content">
                    <div>
                        <Link href="/">
                            <SquareLogo className="w-48" color="#ffffff" />
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <span>123 Main St</span>
                        <span>Los Angeles, CA 90123</span>
                        <span>United States</span>
                        <span className="mt-4">
                            <Link
                                prefetch={false}
                                className="underline"
                                href="mailto:support@supacommerce.com"
                            >
                                support@supacommerce.com
                            </Link>
                        </span>
                    </div>
                    <div>
                        <span className="footer-title">Services</span>
                        <Link href="/" className="link link-hover">
                            Branding
                        </Link>
                        <Link href="/" className="link link-hover">
                            Design
                        </Link>
                        <Link href="/" className="link link-hover">
                            Marketing
                        </Link>
                        <Link href="/" className="link link-hover">
                            Advertisement
                        </Link>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <Link href="/" className="link link-hover">
                            About us
                        </Link>
                        <Link href="/" className="link link-hover">
                            Contact
                        </Link>
                        <Link href="/" className="link link-hover">
                            Jobs
                        </Link>
                        <Link href="/" className="link link-hover">
                            Press kit
                        </Link>
                    </div>
                    <div>
                        <span className="footer-title">Legal</span>
                        <Link href="/" className="link link-hover">
                            Terms of use
                        </Link>
                        <Link href="/" className="link link-hover">
                            Privacy policy
                        </Link>
                        <Link href="/" className="link link-hover">
                            Cookie policy
                        </Link>
                    </div>
                    <div>
                        <span className="footer-title">Social</span>
                        <Link href="/" className="link link-hover">
                            Twitter
                        </Link>
                        <Link href="/" className="link link-hover">
                            Instagram
                        </Link>
                        <Link href="/" className="link link-hover">
                            Facebook
                        </Link>
                        <Link href="/" className="link link-hover">
                            Github
                        </Link>
                    </div>
                    <div>
                        <span className="footer-title">Explore</span>
                        <Link href="/" className="link link-hover">
                            Features
                        </Link>
                        <Link href="/" className="link link-hover">
                            Enterprise
                        </Link>
                        <Link href="/" className="link link-hover">
                            Security
                        </Link>
                        <Link href="/" className="link link-hover">
                            Pricing
                        </Link>
                    </div>
                    <div>
                        <span className="footer-title">Apps</span>
                        <Link href="/" className="link link-hover">
                            Mac
                        </Link>
                        <Link href="/" className="link link-hover">
                            Windows
                        </Link>
                        <Link href="/" className="link link-hover">
                            iPhone
                        </Link>
                        <Link href="/" className="link link-hover">
                            Android
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
