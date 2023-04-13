import Image from "next/image";
import React from "react";

export default function Webinars() {
    return (
        <div className="hero min-h-fit bg-white md:w-3/4 md:mx-auto md:rounded-lg my-4">
            <div className="group hero-content mx-12 flex-col lg:flex-row-reverse">
                <Image
                    src={
                        "https://www.icpdas.com/web/product/product_Image/png/io_and_unit/rs-485/I-7000/I-7088D-G_S/I-7088D-G_S_la01.png"
                    }
                    alt="asd"
                    width={500}
                    height={500}
                    className="max-w-sm group-hover:-translate-x-10 transition-all group-hover:scale-105"
                />
                <div className="w-3/4">
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-accent text-white">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}
