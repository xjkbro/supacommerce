"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSupabase } from "@/components/providers/supabase-provider";
import NavBar from "@/components/Navbar";

export default function Account() {
    const { supabase } = useSupabase();
    const router = useRouter();
    const [user, setUser] = useState();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
    });
    useEffect(() => {
        async function getUser() {
            const { user: data, error } = await supabase.auth.getUser();
            // return data;
            if (data) setUser(data);
            // else router.replace("/");
        }
        getUser();
        // console.log(getUser());
    }, [user, setUser]);

    async function onSubmit(values) {
        const {
            data: { user },
            error,
        } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });

        if (user) router.replace("/");

        // setEmail(user.email);

        // const { data } = await supabase.auth.getSession();
        // setSession(data);
    }
    return (
        <>
            <div className="flex flex-wrap min-h-screen justify-start bg-base-200 py-10 p-2">
                <div className="container mx-auto">
                    <div className="prose mb-8">
                        <h1>User Account</h1>
                    </div>
                    <div className="flex flex-col w-full lg:flex-row ">
                        <div className="mt-8 grid w-full h-fit lg:w-1/2 flex-grow card rounded-box place-">
                            <h2 className="text-xl font-semibold">
                                User Details
                            </h2>
                            <small>
                                This information will be displayed publicly so
                                be careful what you share.
                            </small>
                        </div>
                        {/* <div className="divider divider-horizontal"></div> */}
                        <div className="grid w-full lg:w-1/2   flex-grow card bg-white rounded-box">
                            <form className="p-8 flex flex-col gap-2" action="">
                                <div className="w-full flex justify-center gap-2 p-4">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <Image
                                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
                                                width={100}
                                                height={100}
                                                alt="avatar"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between gap-2">
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">
                                                First Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full focus:outline-primary-focus"
                                        />
                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">
                                                Last Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full focus:outline-primary-focus"
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex justify-between gap-2">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">
                                                Company Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full focus:outline-primary-focus"
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex justify-between gap-2">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">
                                                Email
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="You can't touch this"
                                            className="input input-bordered w-full "
                                            disabled
                                        />
                                        <label className="label">
                                            <span className="label-text-alt text-warning">
                                                You cannot change your email.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center my-2">
                                    <button className="btn btn-primary btn-wide">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
