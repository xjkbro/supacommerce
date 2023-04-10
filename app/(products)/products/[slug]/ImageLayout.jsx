"use client";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";

const imgArr = [
    "https://plus.unsplash.com/premium_photo-1680512467504-39224db53858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
];
export default function ImageLayout({ product }) {
    const [modalImg, setModalImg] = useState("");
    const [toggleModal, setToggleModal] = useState(false);
    const [prodImg, setProdImg] = useState(product.image);
    return (
        <>
            <div className="flex flex-col md:flex-row gap-2">
                <div
                    onClick={(e) => {
                        console.log(toggleModal);
                        setToggleModal(!toggleModal);
                    }}
                    className="border border-base-200 w-full h-96 md:w-96 md:h-96 object-contain flex justify-center items-center rounded-xl hover:cursor-zoom-in "
                >
                    <Image
                        className="w-32 h-32 md:w-64 md:h-64 object-contain"
                        width={500}
                        height={500}
                        alt="cat"
                        priority
                        src={prodImg}
                    />
                </div>
                <ul className="flex flex-row md:flex-col gap-2 w-full h-24 md:w-24 md:h-96 overflow-scroll">
                    {imgArr.map((img) => (
                        <li
                            key={img}
                            className="flex justify-center items-center min-w-[6rem] min-h-[6rem] w-24  h-24 rounded-md border hover:border-4 border-base-200 -space-x-24 hover:cursor-pointer overflow-hidden"
                        >
                            <Image
                                className="w-28 h-28 object-cover hover:opacity-75 transition-opacity"
                                width={500}
                                height={500}
                                alt="cat"
                                onClick={(e) => {
                                    console.log(e.target.src);
                                    setProdImg(e.target.src);
                                    setModalImg(e.target.src);
                                }}
                                priority
                                src={img}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div
                onClick={() => {
                    console.log(toggleModal);
                    setToggleModal(!toggleModal);
                }}
                className={clsx(
                    "modal backdrop-blur-sm transition-all ",
                    toggleModal && "opacity-100 visible pointer-events-auto "
                )}
            >
                <div className="modal-box  relative z-[9999999]">
                    <button
                        onClick={() => {
                            console.log(toggleModal);
                            setToggleModal(!toggleModal);
                        }}
                        className="btn btn-sm btn-circle absolute right-2 top-2 z-[9999999]"
                    >
                        ✕
                    </button>
                    <Image
                        className="w-[50vh] h-[50vh] object-contain"
                        width={1000}
                        height={1000}
                        alt="cat"
                        priority
                        src={modalImg}
                    />
                </div>
            </div>
        </>
    );
}
