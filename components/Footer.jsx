"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LongLogo from "@/components/ui/LongLogo";
import SquareLogo from "./ui/SquareLogo";

export default function Footer({ user }) {
    const path = usePathname();
    if (path == "/login" || path == "/register") return <></>;
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
                <button>
                    {/* <svg
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
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg> */}
                    {/* <label tabIndex={0} className="btn btn-ghost btn-circle"> */}
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
                        <span className="badge badge-sm indicator-item">8</span>
                    </div>
                    {/* </label> */}
                </button>

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
                            {/* <LongLogo className="w-48 h-12" /> */}
                            <SquareLogo className="w-48" color="#ffffff" />
                        </Link>
                    </div>
                    <div>
                        <p>123 Main St</p>
                        <p>Los Angeles, CA 90123</p>
                        <p>United States</p>
                        <p className="mt-4">
                            <Link
                                prefetch={false}
                                className="underline"
                                href="mailto:support@supacommerce.com"
                            >
                                support@supacommerce.com
                            </Link>
                        </p>
                    </div>
                    <div>
                        <span className="footer-title">Services</span>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </div>
                    <div>
                        <span className="footer-title">Legal</span>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </div>
                    <div>
                        <span className="footer-title">Social</span>
                        <a className="link link-hover">Twitter</a>
                        <a className="link link-hover">Instagram</a>
                        <a className="link link-hover">Facebook</a>
                        <a className="link link-hover">Github</a>
                    </div>
                    <div>
                        <span className="footer-title">Explore</span>
                        <a className="link link-hover">Features</a>
                        <a className="link link-hover">Enterprise</a>
                        <a className="link link-hover">Security</a>
                        <a className="link link-hover">Pricing</a>
                    </div>
                    <div>
                        <span className="footer-title">Apps</span>
                        <a className="link link-hover">Mac</a>
                        <a className="link link-hover">Windows</a>
                        <a className="link link-hover">iPhone</a>
                        <a className="link link-hover">Android</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
