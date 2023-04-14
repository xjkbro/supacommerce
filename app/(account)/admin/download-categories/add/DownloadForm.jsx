"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DownloadForm() {
    const { supabase } = useSupabase();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: handleSubmit,
    });
    async function handleSubmit(values) {
        // console.log(values);

        const { data, error } = await supabase
            .from("download_category")
            .insert({
                name: values.name,
            })
            .select()
            .single();

        console.log(data);
        // router.push(`/admin/downloads/${data.id}`);
        // router.refresh();
    }

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 p-2"
        >
            <div className="grid grid-cols-2 gap-4 md:h-[90vh]">
                <div className="w-full p-2 overflow-y-scroll col-span-1 row-span-2">
                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">
                                Download Category Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...formik.getFieldProps("name")}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
