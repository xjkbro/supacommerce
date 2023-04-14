import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FeaturePosts() {
    const testArr = [
        {
            title: "Test 1",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo eveniet recusandae repudiandae!",
            image: "https://plus.unsplash.com/premium_photo-1663011472110-7eae3fcd7a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
        {
            title: "Test 2",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo eveniet recusandae repudiandae!",
            image: "https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80",
        },
        {
            title: "Test 3",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo eveniet recusandae repudiandae!",
            image: null,
        },
        {
            title: "Test 4",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo eveniet recusandae repudiandae!",
            image: "https://images.unsplash.com/photo-1498631906572-66c58d46ecf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2483&q=80",
        },
        {
            title: "Test 5",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo eveniet recusandae repudiandae!",
            image: "https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80",
        },
        {
            title: "Test 6",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo eveniet recusandae repudiandae!",
            image: "https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
        },
    ];
    return (
        <div className="w-11/12 md:w-3/4 my-12 mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black my-4">Articles</h2>
                <Link
                    className="hover:underline uppercase text-sm font-semibold"
                    href="/articles"
                >
                    View All
                </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {testArr.map((item, i) => (
                    <div
                        key={item.title}
                        className="card w-full h-64 bg-base-100 shadow-xl image-full"
                    >
                        {item.image == null ? (
                            <></>
                        ) : (
                            <figure>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={300}
                                    height={300}
                                    className="object-contain w-full h-96"
                                />
                            </figure>
                        )}
                        <div className="card-body">
                            <h2 className="card-title text-white">
                                {item.title}
                            </h2>
                            <p className="text-white">{item.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Read Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
