import Link from "next/link";
import React from "react";

export default function VideoHero({ type, url }) {
    return (
        <section className="relative min-h-[80vh]  flex flex-col items-center justify-center text-center text-white py-0 px-3">
            <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-['#000000FF'] after:z-[1]">
                <video
                    className="min-w-full min-h-full absolute object-cover opacity-75 bg-blend-darken"
                    autoPlay
                    muted
                    loop
                >
                    <source src={url} type="video/mp4" />
                </video>
            </div>
            {/* <div className="hero-content text-center text-neutral-content z-[2]"> */}
            <div className="flex justify-center items-center w-[105%] text-center backdrop-blur-[3px] backdrop-brightness-75 min-h-[80vh] text-neutral-content z-[2]">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">SupaCommerce</h1>
                    <p className="mb-5">
                        A supa way to handle all your commerce needs
                    </p>
                    <Link href="/products" className="btn btn-primary">
                        Start Shopping
                    </Link>
                </div>
            </div>
        </section>
    );
}
