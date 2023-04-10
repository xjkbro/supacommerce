"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSupabase } from "@/components/providers/supabase-provider";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast, TypeOptions } from "react-toastify";
import { startWindToast } from "@mariojgt/wind-notify/packages/index.js";
import { clsx } from "clsx";

// import NavBar from "@/components/Navbar";

export default function Details({ user }) {
    const { supabase } = useSupabase();
    const avatarInput = useRef();
    const router = useRouter();
    // const [user, setUser] = useState(getUser());
    const [avatar, setAvatar] = useState(
        user?.user_metadata?.avatar ??
            "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
        // "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
    );
    const [toast, setToast] = useState({ active: false, msg: "", type: "" });
    // const [toast, setToast] = useState(false);

    const formik = useFormik({
        initialValues: {
            first_name: user?.user_metadata?.first_name,
            last_name: user?.user_metadata?.last_name,
            company: user?.user_metadata?.company,
        },

        onSubmit,
    });

    async function onSubmit(values) {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                first_name: values.first_name,
                last_name: values.last_name,
                company: values.company,
                avatar: avatar,
            },
        });
        if (data) {
            setToast({
                active: true,
                msg: "User Details was successfully changed.",
                type: "success",
            });
            setTimeout(() => {
                setToast({
                    active: false,
                    msg: "User Details was successfully changed.",
                    type: "success",
                });
            }, 2000);
        } else {
            setToast({
                active: true,
                msg: "Error has occurred.",
                type: "error",
            });
            setTimeout(() => {
                setToast({
                    active: false,
                    msg: "Error has occurred.",
                    type: "error",
                });
            }, 2000);
        }
        // await
    }
    const onAvatarInputChange = async (e) => {
        // console.log(e.target.files[0]);

        const { data: placeholder, error } = await supabase.storage
            .from("avatars")
            .upload(user?.id + "/" + uuidv4() + ".png", e.target.files[0]);

        console.log(placeholder);
        setAvatar(
            "https://anyzlthrxmlnduuesdhk.supabase.co/storage/v1/object/public/avatars/" +
                placeholder.path
        );
    };
    const handleAvatar = (e) => {
        console.log(e);
        console.log(avatarInput);
        avatarInput.current.click();
    };

    return (
        <>
            <div
                className={
                    " toast toast-top toast-end z-50 transition-all  " +
                    (toast.active ? "translate-x-0" : "translate-x-96")
                }
            >
                <div
                    className={clsx(
                        "alert",
                        toast.type == "success" && "alert-success shadow-md",
                        toast.type == "error" && "alert-error shadow-md"
                    )}
                >
                    <div>
                        <span>{toast.msg}</span>
                    </div>
                </div>
            </div>
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
                        <div className="grid w-full lg:w-1/2 flex-grow card bg-white rounded-box">
                            <form
                                onSubmit={formik.handleSubmit}
                                className="p-8 flex flex-col gap-2"
                            >
                                <div className="w-full flex justify-center gap-2 p-4">
                                    <div className="avatar">
                                        <div className="w-24 h-24 object-cover rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <button
                                                onClick={handleAvatar}
                                                className="w-24 h-24 object-cover flex justify-center -space-x-24"
                                            >
                                                <Image
                                                    src={avatar}
                                                    width={100}
                                                    height={100}
                                                    alt="avatar"
                                                    className=""
                                                />
                                                <div className="w-24 h-24 opacity-0 hover:opacity-100 transition-all ">
                                                    <span className="w-24 h-24 bg-black opacity-50 px-12 py-1 text-xs text-white flex justify-center items-center ">
                                                        Change Avatar
                                                    </span>
                                                </div>
                                            </button>
                                            <input
                                                ref={avatarInput}
                                                name="avatar"
                                                type="file"
                                                accept="image/png"
                                                onChange={onAvatarInputChange}
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
                                            {...formik.getFieldProps(
                                                "first_name"
                                            )}
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
                                            {...formik.getFieldProps(
                                                "last_name"
                                            )}
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
                                            {...formik.getFieldProps("company")}
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
                                            value={user.email}
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
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-wide"
                                    >
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
