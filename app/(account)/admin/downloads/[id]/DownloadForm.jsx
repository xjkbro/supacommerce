"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { supabaseCDN } from "@/lib/supabase-cdn";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function DownloadForm({ download, bucket }) {
    const { supabase } = useSupabase();
    const router = useRouter();
    console.log(bucket);
    const downloadInput = useRef();
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [listDownloads, setListDownloads] = useState(bucket);

    const formik = useFormik({
        initialValues: {
            name: download.name,
            slug: download.slug,
            description: download.description,
            file: download.file,
            // recent: "",
        },
        onSubmit: handleSubmit,
    });
    async function handleUpload() {
        setIsUploading(true);
        console.log(downloadInput.current.files);
        if (downloadInput.current.files.length > 0) {
            const { data, error } = await supabase.storage
                .from("downloads")
                .upload(
                    `${download.id}/${downloadInput.current.files[0].name}`,
                    downloadInput.current.files[0]
                );
        }
        const { data, error } = await supabase.storage
            .from("downloads")
            .list(`${download.id}`, {
                sortBy: { column: "name", order: "asc" },
            });
        // downloadInput.current.files = null;
        // downloadInput.current.value = null;
        setListDownloads(data);
        setIsUploading(false);
    }
    async function handleSubmit(values) {
        // console.log(values);

        const { data, error } = await supabase
            .from("downloads")
            .update({
                name: values.name,
                slug: values.slug,
                description: values.description,
                file: values.file,
            })
            .eq("id", download.id);

        console.log(data);
        // router.push(`/admin/downloads/${data.id}`);
        router.refresh();
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
                                ref={downloadInput}
                                type="file"
                                className="file-input file-input-bordered w-full"
                            />
                            <button
                                className="btn btn-outline"
                                disabled={isUploading}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleUpload();
                                }}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                    <div name="file" className="form-control w-full">
                        <label className="label">
                            <span className="label-text">File</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            {...formik.getFieldProps("file")}
                        >
                            <option value="" selected>
                                None
                            </option>
                            {listDownloads.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
                <div className="w-full p-2 border-base-200 border col-span-1 row-span-1">
                    {listDownloads.map((item, i) => (
                        <button
                            onClick={() => setSelectedFile(item)}
                            className="ml-4 my-1 text-sm block"
                            key={item.id}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
                <div className="w-full p-2 border-base-200 border col-span-1 row-span-1 overflow-scroll">
                    {selectedFile && (
                        <>
                            <pre className="">
                                {JSON.stringify(selectedFile, null, 2)}
                            </pre>
                            <div>
                                Download URL:{" "}
                                <Link
                                    href={supabaseCDN(
                                        "downloads",
                                        download.id,
                                        selectedFile?.name
                                    )}
                                >
                                    download
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
