"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryForm({ categories }) {
    const { supabase } = useSupabase();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            parent: "",
        },
        onSubmit: handleSubmit,
    });
    async function handleSubmit(values) {
        console.log(values);

        const { data, error } = await supabase
            .from("categories")
            .insert({
                name: values.name,
                description: values.description,
                parent: values.parent == "" ? null : values.parent,
            })
            .select()
            .single();

        console.log(data);
        // router.push("/admin/categories/add");
        router.refresh();
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:h-[90vh]">
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
                            <span className="label-text">Category Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...formik.getFieldProps("name")}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Parent</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            {...formik.getFieldProps("parent")}
                        >
                            <option value="" selected>
                                None
                            </option>
                            {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
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
