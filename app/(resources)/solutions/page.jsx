import { arbritraryArray } from "@/lib/utils";
import React from "react";

export default function Solutions() {
    const arr = arbritraryArray(10);
    return (
        <div className="w-11/12 md:w-3/4 mx-auto my-4">
            <div className="my-8">
                <h1 className="text-3xl font-bold">Webinars</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {arr.map((item) => (
                    <div
                        key={item}
                        className="card w-full bg-base-100 shadow-xl"
                    >
                        <div className="card-body">
                            <h2 className="card-title">Lorem Ipsum</h2>
                            <small>Date</small>
                            <p className="prose">
                                If a dog chews shoes whose shoes does he choose?
                                <ul>
                                    <li>list1</li>
                                    <li>list2</li>
                                    <li>list3</li>
                                    <li>list4</li>
                                </ul>
                            </p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-accent btn-outline ">
                                    Watch
                                </button>
                                <button className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
