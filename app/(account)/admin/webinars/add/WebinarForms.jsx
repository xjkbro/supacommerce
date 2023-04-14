"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WebinarForm({ webinars }) {
    const { supabase } = useSupabase();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            date: "",
            registration_link: "",
        },
        onSubmit: handleSubmit,
    });
    async function handleSubmit(values) {
        console.log(values);

        const { data, error } = await supabase
            .from("webinars")
            .insert({
                title: values.name,
                description: values.description,
                date: values.date,
                registration_link: values.registration_link,
            })
            .select()
            .single();

        console.log(data);
        console.log(error);
        // router.push("/admin/webinars/add");
        router.refresh();
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[90vh]">
            {/* Product Form */}
            <div className="w-full p-2 overflow-y-scroll ">
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-4 p-2"
                >
                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Webinar Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...formik.getFieldProps("title")}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input
                            type="date"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...formik.getFieldProps("date")}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label" htmlFor="description">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-56"
                            name="description"
                            placeholder="Description"
                            {...formik.getFieldProps("description")}
                        ></textarea>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">
                                Registration Link
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...formik.getFieldProps("registration_link")}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
