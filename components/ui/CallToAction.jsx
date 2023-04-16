import React from "react";

export default function CallToAction() {
    return (
        <div className="hero min-h-fit bg-primary text-white py-8">
            <div className="hero-content flex-col lg:flex-row gap-12">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Join Our Newsletter</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full md:w-1/2 shadow-2xl bg-base-100">
                    <div className="card-body flex-row gap-2">
                        <div className="form-control w-full">
                            <input
                                type="text"
                                placeholder="E-mail"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mt-0">
                            <button className="btn btn-accent whitespace-nowrap">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
