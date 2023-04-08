"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSupabase } from "@/components/providers/supabase-provider";
import LongLogo from "@/components/UI Components/LongLogo";
import SquareLogo from "@/components/UI Components/SquareLogo";

export default function Login() {
    const router = useRouter();
    const { supabase } = useSupabase();
    const [show, setShow] = useState(false);
    const [userState, setUserState] = useState(null);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
    });

    async function onSubmit(values) {
        const {
            data: { user },
            error,
        } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });
        if (user) {
            setUserState(user);
            router.refresh();
            router.replace("/");
        }
        // if (user) router.replace("/");

        // setEmail(user.email);

        // const { data } = await supabase.auth.getSession();
        // setSession(data);
    }
    return (
        <>
            <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
                {/*  */}
                <div className="flex shadow-md">
                    <div className="flex flex-wrap content-center justify-center rounded-md md:rounded-l-md bg-white w-[24rem] h-[32rem]">
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
                                {/* <LongLogo /> */}
                            </Link>
                            <h1 className="text-xl font-semibold">
                                Welcome back
                            </h1>
                            <small className="text-gray-400">
                                Welcome back! Please enter your details
                            </small>

                            <form
                                className="mt-4"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-3">
                                    <label className="mb-2 block text-xs font-semibold">
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
                                    <label className="mb-2 block text-xs font-semibold">
                                        Password
                                    </label>
                                    <input
                                        type={`${show ? "text" : "password"}`}
                                        placeholder="********"
                                        className="block w-full rounded-md border border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("password")}
                                    />
                                </div>

                                <div className="mb-3 flex flex-wrap content-center">
                                    {/* <input
                                        id="remember"
                                        type="checkbox"
                                        className="mr-1 checked:bg-primary"
                                    />{" "}
                                    <label
                                        htmlFor="remember"
                                        className="mr-auto text-xs font-semibold"
                                    >
                                        Remember for 30 days
                                    </label> */}
                                    <Link
                                        href="#"
                                        className="text-xs font-semibold text-primary"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="mb-3">
                                    <button className="mb-1.5 block w-full text-center text-white bg-primary hover:bg-primary-focus transition-colors px-2 py-1.5 rounded-md">
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <div className="text-center">
                                <span className="text-xs text-gray-400 font-semibold">
                                    Don&apos;t have account?
                                </span>
                                <Link
                                    href="/register"
                                    className="text-xs font-semibold text-primary"
                                >
                                    {" "}
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-wrap content-center justify-center rounded-r-md w-[24rem] h-[32rem]">
                        <Image
                            className="w-full h-full object-cover object-[25%] bg-no-repeat bg-cover rounded-r-md"
                            width={1200}
                            height={800}
                            alt="cat"
                            priority
                            src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                            // src="https://images.unsplash.com/photo-1659460542526-35b3257e1152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
