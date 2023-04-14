"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-grid-carousel";

export default function ProductCarousel({ items }) {
    return (
        <Carousel
            cols={4}
            rows={1}
            gap={10}
            loop
            autoplay={3000}
            responsiveLayout={[
                {
                    breakpoint: 1200,
                    cols: 2,
                    rows: 1,
                    gap: 10,
                    loop: true,
                    autoplay: 1000,
                },
                {
                    breakpoint: 560,
                    cols: 1,
                    rows: 1,
                    gap: 10,
                    loop: true,
                    autoplay: 1000,
                },
            ]}
            showDots
        >
            {items.map((item) => (
                <Carousel.Item key={item.id}>
                    <div className=" flex flex-col mt-4 items-center  border border-base-200 p-2">
                        <Link href={"/products/" + item.slug}>
                            <Image
                                src={item.image}
                                width={300}
                                height={300}
                                alt="prod"
                                className="w-56 h-56 my-4 object-contain"
                            />
                        </Link>
                        <div className="w-56 my-4">
                            <Link
                                href={"/products/" + item.slug}
                                className="text-xl font-semibold"
                            >
                                {item.title}
                            </Link>
                            <p className="text-lg font-light text-error mb-4">
                                ${item.price.toFixed(2)}
                            </p>

                            <button className="btn btn-block btn-accent ">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
    return (
        <div className="carousel w-full gap-2">
            {items ? (
                items.map((item) => (
                    <div
                        key={item.id}
                        className="carousel-item relative h-fit w-64 border border-base-200 flex justify-center"
                    >
                        <div className=" flex flex-col mt-4 items-center">
                            <Link href={"/products/" + item.slug}>
                                <Image
                                    src={item.image}
                                    width={300}
                                    height={300}
                                    alt="prod"
                                    className="w-56 h-56 my-4 object-contain"
                                />
                            </Link>
                            <div className="w-56 my-4">
                                <Link
                                    href={"/products/" + item.slug}
                                    className="text-xl font-semibold"
                                >
                                    {item.title}
                                </Link>
                                <p className="text-lg font-light text-error mb-4">
                                    ${item.price.toFixed(2)}
                                </p>

                                <button className="btn btn-block btn-accent ">
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
}
