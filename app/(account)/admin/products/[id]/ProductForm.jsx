"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import DragAndDrop from "@/components/ui/DragAndDrop";
import { useFormik } from "formik";
import Link from "next/link";
import { useRef, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const specificationPlaceholder = {
    data: [{ header: "Title", rows: [{ key: "key", val: "value" }] }],
};

export default function ProductForm({ product, bucket }) {
    const { supabase } = useSupabase();
    const [description, setDescription] = useState(
        product?.description ? product.description : ""
    );
    const [specifications, setSpecifications] = useState(
        product?.specifications ? product.specifications : ""
    );
    const [jsonSpecifications, setJsonSpecifications] = useState(
        product?.json_specifications
            ? product.json_specifications
            : specificationPlaceholder
    );
    const productImageInput = useRef();
    const [imgArr, setImgArr] = useState(bucket);

    console.log(imgArr);
    const formik = useFormik({
        initialValues: {
            title: product?.title,
            slug: product?.slug,
            price: product?.price,
            short_description: product?.short_description,
        },
        onSubmit: handleSubmit,
    });
    async function handleUpload() {
        if (productImageInput.current.files.length > 0) {
            const { data, error } = await supabase.storage
                .from("products")
                .upload(
                    `${product.id}/${imgArr.length}.png`,
                    productImageInput.current.files[0]
                );
        }
        const { data, error } = await supabase.storage
            .from("products")
            .list(`${product.id}`, {
                sortBy: { column: "name", order: "asc" },
            });
        productImageInput.current.files = null;
        productImageInput.current.value = null;
        setImgArr(data);
    }
    async function handleSubmit(values) {
        const { error } = await supabase
            .from("products")
            .update({
                title: values.title,
                slug: values.slug,
                price: parseFloat(values.price),
                short_description: values.short_description,
                description,
                specifications,
                json_specifications: jsonSpecifications,
            })
            .eq("id", product.id);

        const rand = Math.random() * (1000 - 100) + 100;
        imgArr.map(async (item, i) => {
            const { data, error } = await supabase.storage
                .from("products")
                .move(
                    `${product.id}/${item.name}`,
                    `${product.id}/${i + rand}.png`
                );
            item.name = `${i + rand}.png`;
        });
        console.log(imgArr);
    }

    return (
        <div className="grid grid-cols-1 ms:grid-cols-2 gap-4 md:h-[90vh]">
            {/* Product Form */}
            <div className="w-full p-2 overflow-y-scroll ">
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-4 p-2"
                >
                    <div className="flex justify-between">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        <Link
                            prefetch={false}
                            href={"/products/" + product.slug}
                            className="btn btn-outline"
                        >
                            View
                        </Link>
                    </div>
                    <div name="title" className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...formik.getFieldProps("title")}
                        />
                    </div>
                    <div name="slug" className="form-control w-full">
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
                    <div name="image" className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Images</span>
                        </label>
                        <div className="flex">
                            <input
                                ref={productImageInput}
                                type="file"
                                accept="image/png"
                                className="file-input file-input-bordered w-full"
                            />
                            <button
                                className="btn btn-outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleUpload();
                                }}
                            >
                                Upload
                            </button>
                        </div>
                        <DragAndDrop
                            path={product.id}
                            array={imgArr}
                            arraySetter={setImgArr}
                        />
                    </div>
                    <div name="price" className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="number"
                            step={0.01}
                            min={0}
                            placeholder="Price"
                            className="input input-bordered w-full "
                            {...formik.getFieldProps("price")}
                        />
                    </div>
                    <div name="short_desc" className="form-control w-full">
                        <label className="label">
                            <span className="label-text">
                                Short Description
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Short Description"
                            className="input input-bordered w-full "
                            {...formik.getFieldProps("short_description")}
                        />
                    </div>
                    {/* <div name="description" className="form-control w-full">
                        <label className="label" htmlFor="description">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-56"
                            name="description"
                            placeholder="Description"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            value={description}
                            // {...formik.getFieldProps("description")}
                        ></textarea>
                    </div> */}
                    <MDEditor
                        value={description}
                        onChange={(val) => setDescription(val)}
                        preview="edit"
                        // extraCommands={[]}
                    />

                    {/* <div name="specification" className="form-control w-full">
                        <label className="label" htmlFor="specification">
                            <span className="label-text">Specification</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-56"
                            name="specifications"
                            placeholder="Specifications"
                            onChange={(e) => {
                                setSpecifications(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                console.log(e);
                                if (e.code === "Tab") e.preventDefault();
                            }}
                            value={specifications}
                            // {...formik.getFieldProps("specification")}
                        ></textarea>
                    </div> */}
                    <div
                        name="jsonSpecification"
                        className="form-control w-full"
                    >
                        <label className="label" htmlFor="specification">
                            <span className="label-text">
                                JSON Specification
                            </span>
                        </label>
                        <JSONInput
                            width="100%"
                            height="300px"
                            placeholder={jsonSpecifications}
                            locale={locale}
                            onBlur={(e) => {
                                // console.log(e);
                                console.log(jsonSpecifications);
                                setJsonSpecifications(e.jsObject);
                            }}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        <Link
                            prefetch={false}
                            href={"/products/" + product.slug}
                            className="btn btn-outline"
                        >
                            View
                        </Link>
                    </div>
                </form>
            </div>
            {/* Markdown Preview */}
            {/* <div className="bg-white prose overflow-y-scroll">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {description}
                </ReactMarkdown>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {specifications}
                </ReactMarkdown>
            </div> */}
        </div>
    );
}
