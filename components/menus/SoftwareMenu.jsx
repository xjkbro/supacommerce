"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import Link from "next/link";
import Image from "next/image";

export default function SoftwareMenu() {
    return (
        <ul className="menu bg-base-100 w-fit pt-2 rounded-box">
            <li className="menu-title">
                <span>Data Logging</span>
            </li>
            <li tabIndex={0}>
                <Link href="/feature/elogger">eLogger</Link>
                <ul className="w-96 bg-base-100 whitespace-normal p-4">
                    <div className="font-bold">eLogger</div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Blanditiis, iusto, hic commodi ea, perspiciatis eaque
                        doloribus tenetur beatae est reprehenderit cum. Quidem,
                        porro quisquam?
                    </div>
                    <Link href="/">view</Link>
                </ul>
            </li>
            <li>
                <Link href="/feature/ez-data-logger">EZ Data Logger</Link>
            </li>
            <li className="menu-title">
                <span>HMI & SCADA Solutions</span>
            </li>
            <li>
                <a>Indusoft</a>
            </li>
            <li>
                <a>AVEVA</a>
            </li>
        </ul>
    );
}
