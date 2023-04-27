"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const top3 = [
    {
        id: 0,
        name: "The tGW-700 Series",
        image: "https://www.icpdas.com/web/product/product_Image/png/industrial_communication/uart/ethernet/tGW-700/tGW-712/tGW-712_la01.png",
        description:
            "Our most popular data communication family, the tGW-700 series, is comprised of Modbus TCP to RTU/ASCII Gateways. This series enables a Modbus TCP/UDP host to communicate with serial Modbus RTU/ASCII devices through an ethernet network and eliminates the cable length limitation of serial communication devices.",
    },
    {
        id: 1,
        name: "InduSoft SCADA",
        image: "https://www.icpdas.com/web/product/product_Image/png/industrial_communication/uart/ethernet/tGW-700/tGW-712/tGW-712_la01.png",
        description:
            "InduSoft is the most sought-after HMI SCADA Solutions software. It is a powerful, integrated collection of automation tools that are needed to develop HMI interfaces.",
    },
    {
        id: 2,
        name: "The TPD-280 Series",
        image: "https://www.icpdas.com/web/product/product_Image/png/industrial_communication/uart/ethernet/tGW-700/tGW-712/tGW-712_la01.png",
        description:
            "The TPD-280 series are our most sought-after touch screen controller HMI devices. The controllers come with free Ladder Designer software for PLC users and a C language development environment.",
    },
];
export default function Top3Products() {
    const [active, setActive] = useState(top3[0]);
    return (
        <div className="w-full md:w-3/4 my-12 mx-auto relative">
            <div className="md:flex items-center justify-between gap-10 m-2">
                <h2 className="text-3xl font-black ">Top Products</h2>

                <div className="tabs mb-4 md:mb-0 ">
                    {top3.map((item, i) => (
                        <span
                            key={i}
                            onClick={() => setActive(top3[i])}
                            className={
                                active.id == item.id
                                    ? "tab tab-bordered tab-active"
                                    : "tab tab-bordered"
                            }
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className="card lg:card-side bg-base-100 md:h-96 md:shadow-md border-base-200 md:border">
                <figure className="pt-8 md:pt-0 h-fit md:h-96 min-w-[24rem] object-contain">
                    <Image
                        src={active.image}
                        width={300}
                        height={300}
                        alt={active.name}
                        className="h-56 w-56 object-contain"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl">{active.name}</h2>
                    <p>{active.description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">View Series</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
