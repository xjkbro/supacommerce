"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSupabase } from "@/components/providers/supabase-provider";
import LongLogo from "@/components/ui/LongLogo";
import SquareLogo from "@/components/ui/SquareLogo";

export default function Form() {
    const [reqMet, setReqMet] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            first_name: "",
            last_name: "",
            company: "",
        },
        onSubmit,
    });
    async function onSubmit(values) {
        console.log(values);
    }
    function validateOnChange(values) {
        console.log(values);
    }
    return (
        <form
            className="my-4"
            onSubmit={formik.handleSubmit}
            onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
            }}
        >
            <div className="md:flex gap-2 w-full">
                <div className="form-control w-full md:w-1/2">
                    <label className="label">
                        <span className="label-text">First Name *</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="First Name"
                        className="input input-bordered w-full"
                        {...formik.getFieldProps("first_name")}
                    />
                </div>
                <div className="form-control w-full md:w-1/2">
                    <label className="label">
                        <span className="label-text">Last Name *</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Last Name"
                        className="input input-bordered w-full"
                        {...formik.getFieldProps("last_name")}
                    />
                </div>
            </div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Email *</span>
                </label>
                <input
                    type="email"
                    required
                    placeholder="Email"
                    className="input input-bordered w-full"
                    {...formik.getFieldProps("email")}
                />
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Company *</span>
                </label>
                <input
                    type="text"
                    required
                    placeholder="Company"
                    className="input input-bordered w-full"
                    {...formik.getFieldProps("company")}
                />
            </div>
            <div className="flex flex-wrap gap-2 my-4 pb-4">
                <button
                    onClick={(e) => {
                        // console.log(e.target.innerHTML);
                        // e.target.innerHTML = "loading...";
                    }}
                    // disabled={!reqMet}
                    className="btn btn-primary  w-full md:w-fit"
                >
                    Submit Quotation
                </button>
            </div>
        </form>
    );
}
