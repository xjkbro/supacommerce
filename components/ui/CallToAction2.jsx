import Image from "next/image";
import React from "react";

export default function CallToAction2() {
    return (
        <div className="hero min-h-fit bg-white md:w-3/4 md:mx-auto md:rounded-lg my-4">
            <div className="group hero-content p-0 m-2 md:mx-12 flex-col lg:flex-row-reverse">
                <Image
                    src={
                        "https://www.icpdas.com/web/product/product_Image/png/io_and_unit/rs-485/I-7000/I-7088D-G_S/I-7088D-G_S_la01.png"
                    }
                    alt="asd"
                    width={500}
                    height={500}
                    className="w-full group-hover:-translate-x-10 transition-all group-hover:scale-105"
                />
                <div className="w-full md:w-3/4">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        Box Office News!
                    </h1>
                    <p className="py-6 w-full">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Rem expedita reprehenderit hic accusamus
                        voluptates nobis ab facilis facere, quod aut cum animi
                        sapiente dolor impedit distinctio perspiciatis
                        consequatur ex optio non aspernatur laudantium sequi
                        similique enim numquam. Ad ratione eum sequi, culpa
                        incidunt, delectus voluptate laudantium nihil doloremque
                        voluptas aperiam!
                    </p>
                    <button className="btn btn-accent">Get Started</button>
                </div>
            </div>
        </div>
    );
}
