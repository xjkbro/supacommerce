"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export default function ProductForm({ product }) {
    const { supabase } = useSupabase();
    const [description, setDescription] = useState(
        product?.description ? product.description : ""
    );
    const [specifications, setSpecifications] = useState(
        product?.specifications ? product.specifications : ""
    );

    const formik = useFormik({
        initialValues: {
            title: product?.title,
            slug: product?.slug,
            price: product?.price,
            short_description: product?.short_description,
        },
        onSubmit: handleSubmit,
    });
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
            })
            .eq("id", product.id);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[90vh]">
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
                            href={"/products/" + product.slug}
                            className="btn btn-outline"
                        >
                            View
                        </Link>
                    </div>
                    <div className="form-control w-full">
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
                    <div className="form-control w-full">
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
                    <div className="form-control w-full">
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
                    </div>
                    <div className="form-control w-full">
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
                            value={specifications}
                            // {...formik.getFieldProps("specification")}
                        ></textarea>
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        <Link
                            href={"/products/" + product.slug}
                            className="btn btn-outline"
                        >
                            View
                        </Link>
                    </div>
                </form>
            </div>
            {/* Markdown Preview */}
            <div className="bg-white prose overflow-y-scroll">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {description}
                </ReactMarkdown>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {specifications}
                </ReactMarkdown>
            </div>
        </div>
    );
}
