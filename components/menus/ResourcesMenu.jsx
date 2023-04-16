import Link from "next/link";
import React from "react";

export default function ResourcesMenu() {
    return (
        <ul className="menu bg-base-100 w-fit z-10">
            <li className="menu-title">
                <span>Written</span>
            </li>
            <li>
                <Link href="/article">Articles</Link>
            </li>
            <li>
                <Link href="/article">Application Stories</Link>
            </li>
            <li className="menu-title">
                <span>Videos</span>
            </li>
            <li>
                <Link href="/webinars">Webinars</Link>
            </li>
            <li>
                <Link href="/article">Training Videos</Link>
            </li>
            <li className="menu-title">
                <span>Other</span>
            </li>
            <li>
                <Link href="/article">Product Downloads</Link>
            </li>
        </ul>
    );
}
