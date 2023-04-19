"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Editor from "@/components/Editor";
import { slugify } from "@/lib/utils";
import Image from "next/image";
import { supabaseCDN } from "@/lib/supabase-cdn";
import Link from "next/link";

export default function CategoryForm({ categories, category }) {
    const { supabase } = useSupabase();
    const router = useRouter();
    const featureImage = useRef();

    const formik = useFormik({
        initialValues: {
            title: category?.title ? category.title : "",
            slug: category?.slug ? category.slug : "",
            short_description: category?.short_description
                ? category.short_description
                : "",
            description: category?.description ? category.description : "",
            parent: category?.parent ? category.parent : "",
        },
        onSubmit: handleSubmit,
    });
    // async function handleSubmit(values) {
    //     const { data, error } = await supabase
    //         .from("categories")
    //         .insert({
    //             title: values.title,
    //             slug: values.slug,
    //             short_description: values.short_description,
    //             description: values.description,
    //             parent: values.parent == "" ? null : values.parent,
    //         })
    //         .select()
    //         .single();
    //     // router.push("/admin/categories/add");
    //     router.refresh();
    // }

    async function handleSubmit(values) {
        // Uplaods Image if field has been filled
        if (featureImage.current.files.length > 0) {
            const { data, error } = await supabase.storage
                .from("categories")
                .upload(
                    `${formik.values.slug}.png`,
                    featureImage.current.files[0],
                    { upsert: true }
                );
        }

        //Add or Upserts post in post table
        if (category) {
            const { data } = await supabase
                .from("categories")
                .upsert({
                    id: category.id,
                    title: values.title,
                    slug: values.slug,
                    short_description: values.short_description,
                    description: values.description,
                    parent: values.parent == "" ? null : values.parent,
                })
                .select("*")
                .single();
            // router.push("/admin/posts/" + data.id);
            router.refresh();
        } else {
            const { data } = await supabase
                .from("categories")
                .insert({
                    title: values.title,
                    slug: values.slug,
                    short_description: values.short_description,
                    description: values.description,
                    parent: values.parent == "" ? null : values.parent,
                })
                .select("*")
                .single();
            router.push("/admin/categories/" + data.id);
        }

        // router.refresh();
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:h-[90vh]">
            {/* Product Form */}
            <div className="w-full p-2 overflow-y-scroll ">
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-4 p-2"
                >
                    {/* <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div> */}
                    <div className="flex justify-end gap-4">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        {category && (
                            <>
                                <Link
                                    className="btn btn-outline"
                                    href={"/categories/" + formik.values.slug}
                                >
                                    View
                                </Link>
                                <button
                                    className="btn btn-error cursor-pointer"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const { data } = await supabase
                                            .from("categories")
                                            .delete()
                                            .match({ id: category.id });
                                        router.push("/admin/categories");
                                    }}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Title</span>
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
                        <div className="flex flex-wrap items-center w-full">
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered flex-grow "
                                {...formik.getFieldProps("slug")}
                            />
                            <span
                                className="tooltip w-12 before:-translate-x-48"
                                data-tip="Must have title filled out to work"
                            >
                                <button
                                    disabled={formik.values.title.length == 0}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        formik.setFieldValue(
                                            "slug",
                                            slugify(formik.values.title)
                                        );
                                    }}
                                    className="btn btn-square btn-outline"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">
                                Short Description
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...formik.getFieldProps("short_description")}
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
                                    {item.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div name="image" className="form-control w-full">
                        {category && formik.values.slug != "" ? (
                            <div className="mx-auto">
                                <Image
                                    src={supabaseCDN(
                                        "categories",
                                        formik.values.slug + ".png"
                                    )}
                                    alt={formik.values.title}
                                    width={200}
                                    height={200}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        <label className="label">
                            <span className="label-text">Feature Image</span>
                        </label>
                        <div className="flex">
                            <input
                                ref={featureImage}
                                type="file"
                                className="file-input file-input-bordered w-full"
                            />
                        </div>
                    </div>
                    <Editor
                        value={formik.values.description}
                        onChange={(description) => {
                            formik.setFieldValue("description", description);
                        }}
                    />
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
