"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DownloadForm() {
    const { supabase } = useSupabase();
    const router = useRouter();
    // const downloadInput = useRef();
    // const [listDownloads, setListDownloads] = useState(bucket);

    const formik = useFormik({
        initialValues: {
            name: "",
            slug: "",
            description: "",
            // recent: "",
        },
        onSubmit: handleSubmit,
    });
    // async function handleUpload() {
    //     if (downloadInput.current.files.length > 0) {
    //         const { data, error } = await supabase.storage
    //             .from("downloads")
    //             .upload(
    //                 `${download.id}/${"test"}.png`,
    //                 downloadInput.current.files[0]
    //             );
    //     }
    //     const { data, error } = await supabase.storage
    //         .from("products")
    //         .list(`${product.id}`, {
    //             sortBy: { column: "name", order: "asc" },
    //         });
    //     downloadInput.current.files = null;
    //     downloadInput.current.value = null;
    //     setImgArr(data);
    // }
    async function handleSubmit(values) {
        // console.log(values);

        const { data, error } = await supabase
            .from("downloads")
            .insert({
                name: values.name,
                slug: values.slug,
                description: values.description,
            })
            .select()
            .single();

        console.log(data);
        router.push(`/admin/downloads/${data.id}`);
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
                            <span className="label-text">Download Name</span>
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
                            <span className="label-text">Slug</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...formik.getFieldProps("slug")}
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
                    <div name="image" className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Upload File</span>
                        </label>
                        <div className="flex">
                            <input
                                // ref={productImageInput}
                                type="file"
                                accept="image/png"
                                disabled
                                className="file-input file-input-bordered w-full"
                            />
                            <button
                                disabled
                                className="btn btn-outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleUpload();
                                }}
                            >
                                Upload
                            </button>
                        </div>
                        <small>
                            To upload files, the entry must be created first.
                        </small>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
                <div className="w-full p-2 border-base-200 border col-span-1 row-span-1">
                    {/* asda */}
                </div>
                <div className="w-full p-2 border-base-200 border col-span-1 row-span-1">
                    {/* asda */}
                </div>
            </div>
        </form>
    );
}
