"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { supabaseCDN } from "@/lib/supabase-cdn";
import { containsObject } from "@/lib/utils";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { fileTypeOptions } from "@/lib/admin-constants";

export default function DownloadForm({
    products,
    download,
    bucket,
    prodSelected,
    downloadToProducts,
}) {
    const { supabase } = useSupabase();
    const router = useRouter();
    console.log(bucket);
    const downloadInput = useRef();
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [listDownloads, setListDownloads] = useState(bucket);

    const [selectedProducts, setSelectedProducts] = useState(prodSelected);
    const [filteredSearch, setFilteredSearch] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: download.name,
            slug: download.slug,
            type: download.type,
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
    const filterSearch = (e) => {
        if (e.target.value.length > 0) {
            var wordList = products.filter((elem, index) =>
                elem.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            // console.log(wordList);
            // console.log(result);
            setFilteredSearch(wordList);
        } else {
            setFilteredSearch([]);
        }
    };
    async function handleSubmit(values) {
        // console.log(values);
        // Delete all old product_downloads relationship entries
        downloadToProducts.map(async (item) => {
            const { data } = await supabase
                .from("product_downloads")
                .delete()
                .eq("id", item.id);
        });
        //Insert new product_downloads relationship
        selectedProducts.map(async (item) => {
            const { data } = await supabase
                .from("product_downloads")
                .insert({ product_id: item.id, download_id: download.id });
        });

        const { data, error } = await supabase
            .from("downloads")
            .update({
                name: values.name,
                slug: values.slug,
                type: values.type,
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
            <div className="grid grid-cols-2 gap-4 md:min-h-[90vh] h-fit">
                <div className="w-full p-2  col-span-1 row-span-2">
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
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Parent</span>
                        </label>
                        <select
                            defaultValue={"user-manual"}
                            className="select select-bordered w-full"
                            {...formik.getFieldProps("type")}
                        >
                            {fileTypeOptions.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
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
                            defaultValue={""}
                            className="select select-bordered w-full"
                            {...formik.getFieldProps("file")}
                        >
                            <option value="">None</option>
                            {listDownloads.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="my-2">
                        <label>Selected Products</label>
                        <ul className="flex gap-1 mb-2 flex-wrap">
                            {selectedProducts.map((item, i) => (
                                <li
                                    key={item.id}
                                    className="px-2 py-1 border border-base-200 flex gap-2 justify-center items-center "
                                >
                                    <span>{item.title}</span>
                                    <span
                                        onClick={() => {
                                            const id =
                                                selectedProducts.indexOf(item);
                                            const temp = [...selectedProducts];
                                            temp.splice(id, 1);
                                            console.log("Temp:", temp);
                                            setSelectedProducts(temp);
                                        }}
                                        className="hover:bg-base-300 cursor-pointer flex justify-center items-center  w-4 h-4"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-3 h-3"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            placeholder="Filter Products..."
                            className="input input-bordered w-full focus:outline-none"
                            onChange={filterSearch}
                        />
                        <ul className=" bg-base-100 border border-base-200 w-full p-2 shadow-sm rounded-box flex-nowrap  h-fit max-h-[30vh] overflow-y-scroll">
                            {filteredSearch.length > 0 ? (
                                <>
                                    {filteredSearch
                                        .slice(0, 100)
                                        .map((item, i) => (
                                            <li key={i}>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        console.log(
                                                            selectedProducts
                                                        );
                                                        if (
                                                            !containsObject(
                                                                item,
                                                                selectedProducts
                                                            )
                                                        ) {
                                                            setSelectedProducts(
                                                                [
                                                                    ...selectedProducts,
                                                                    item,
                                                                ]
                                                            );
                                                        }
                                                    }}
                                                    className="flex gap-2"
                                                >
                                                    <div>{item.title}</div>
                                                </button>
                                            </li>
                                        ))}
                                </>
                            ) : (
                                <li>No Results</li>
                            )}
                        </ul>
                    </div>
                    <div className="flex justify-end mt-4">
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
                                        download.id + "/" + selectedFile?.name
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
