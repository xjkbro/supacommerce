import Link from "next/link";
import React from "react";

export default function ResourcesMenu() {
    return (
        <ul className="menu bg-base-100 w-fit z-10">
            <li>
                <Link href="/articles">Articles</Link>
            </li>
            <li>
                <Link href="/application-stories">Application Stories</Link>
            </li>
            <li>
                <Link href="/catalogs">Catalogs</Link>
            </li>
            <li>
                <Link href="/downloads">Downloads Center</Link>
            </li>
            <li>
                <Link href="/quotations">Quotation Center</Link>
            </li>
            <li>
                <Link href="/webinars">Webinars</Link>
            </li>
            <li>
                <Link href="/videos">Videos</Link>
            </li>
            <li>
                <Link href="/white-papers">White Papers</Link>
            </li>
        </ul>
    );
}
