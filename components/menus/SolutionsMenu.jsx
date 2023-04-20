import Link from "next/link";
import React from "react";

export default function SolutionsMenu() {
    return (
        <ul className="menu bg-base-100 w-fit rounded-box">
            <li>
                <Link href="/solutions/building-automation">
                    Building Automation
                </Link>
            </li>
            <li>
                <Link href="/solutions/factory-automation">
                    Factory Automation
                </Link>
            </li>
            <li>
                <Link href="/solutions/food-and-beverage">
                    Food &amp; Beverage
                </Link>
            </li>
            <li>
                <Link href="/solutions/green-energy-and-environment">
                    Green Energy &amp; Environment
                </Link>
            </li>
            <li>
                <Link href="/solutions/iiot">IIoT</Link>
            </li>
            <li>
                <Link href="/solutions/laboratories">Laboratories</Link>
            </li>
            <li>
                <Link href="/solutions/transportation">Transportation</Link>
            </li>
        </ul>
    );
}
