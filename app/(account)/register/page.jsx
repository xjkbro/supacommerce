"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSupabase } from "@/components/providers/supabase-provider";
import SquareLogo from "@/components/ui/SquareLogo";

export default function Login() {
    const router = useRouter();
    const { supabase } = useSupabase();
    const [show, setShow] = useState({ password: false, cpassword: false });
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            company: "",
            email: "",
            password: "",
            cpassword: "",
        },
        onSubmit,
    });
    async function onSubmit(values) {
        const { user, error } = await supabase.auth.signUp(
            {
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        first_name: values.first_name,
                        last_name: values.last_name,
                    },
                },
            },
            { redirectTo: `${process.env.NEXT_HOME_URL}/login` }
        );
        console.log({ user });
        if (!error) router.push("/login");
    }
    return (
        <>
            <div className="flex flex-wrap content-center justify-center w-full min-h-screen py-10 bg-gray-200">
                <div className="flex shadow-md">
                    <div className="hidden md:flex flex-wrap content-center justify-center rounded-l-md w-[30rem] min-h-[32rem]">
                        <Image
                            className="w-full h-full object-cover object-[25%] bg-no-repeat bg-cover rounded-l-md"
                            width={1200}
                            height={800}
                            alt="cat"
                            priority
                            src="https://images.unsplash.com/photo-1581090465357-c8a1f71f0407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                            // src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                            // src="https://images.unsplash.com/photo-1659460542526-35b3257e1152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80"
                        />
                    </div>
                    <div className="flex flex-wrap content-center justify-center rounded-md md:rounded-r-md bg-white w-[24rem] min-h-[40rem]">
                        <div className="w-72">
                            <Link className="flex justify-center" href="/">
                                {/* <Image
                                    src="/logo-1200x500.png"
                                    width={480}
                                    height={200}
                                    className="w-96 object-contain"
                                    alt="logo"
                                /> */}
                                <SquareLogo />
                            </Link>
                            <h1 className="text-xl font-semibold">
                                Welcome to SupaCommerce!
                            </h1>
                            <small className="text-gray-400">
                                Fill out the details below to register with us!
                            </small>

                            <form
                                className="mt-4"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-3">
                                    <label className="block mb-2 text-xs font-semibold">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter a First Name"
                                        className="block w-full rounded-md border border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("first_name")}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-2 text-xs font-semibold">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter a Last Name"
                                        className="block w-full rounded-md border border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("last_name")}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-2 text-xs font-semibold">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="block w-full rounded-md border border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("email")}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block mb-2 text-xs font-semibold">
                                        Password
                                    </label>
                                    <input
                                        type={`${
                                            show.password ? "text" : "password"
                                        }`}
                                        placeholder="********"
                                        className="block w-full rounded-md border border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("password")}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block mb-2 text-xs font-semibold">
                                        Confirm Password
                                    </label>
                                    <input
                                        type={`${
                                            show.cpassword ? "text" : "password"
                                        }`}
                                        placeholder="********"
                                        className="block w-full rounded-md border border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("cpassword")}
                                    />
                                </div>

                                <div className="mb-3">
                                    <button
                                        type="submit"
                                        className="mb-1.5 block w-full text-center text-white bg-primary hover:bg-primary-focus transition-colors px-2 py-1.5 rounded-md"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <div className="text-center">
                                <span className="text-xs font-semibold text-gray-400">
                                    Already have an account?
                                </span>
                                <Link
                                    href="/login"
                                    className="text-xs font-semibold text-primary"
                                >
                                    {" "}
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
