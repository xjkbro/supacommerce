import Link from "next/link";
import React from "react";

export default function SolutionsMenu() {
    return (
        <ul className="menu bg-base-100 w-fit rounded-box">
            <li>
                <Link href="/solutions/building-automation.php">
                    Building Automation
                </Link>
            </li>
            <li>
                <Link href="/solutions/factory-automation.php">
                    Factory Automation
                </Link>
            </li>
            <li>
                <Link href="/solutions/food-and-beverage.php">
                    Food &amp; Beverage
                </Link>
            </li>
            <li>
                <Link href="/solutions/green-energy-and-environment.php">
                    Green Energy &amp; Environment
                </Link>
            </li>
            <li>
                <Link href="/solutions/iiot.php">IIoT</Link>
            </li>
            <li>
                <Link href="/solutions/laboratories.php">Laboratories</Link>
            </li>
            <li>
                <Link href="/solutions/transportation.php">Transportation</Link>
            </li>
        </ul>
    );
}
