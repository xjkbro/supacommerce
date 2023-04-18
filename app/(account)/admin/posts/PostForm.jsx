"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useFormik } from "formik";
import { useRouter, use } from "next/navigation";
import { useRef } from "react";
import Editor from "@/components/Editor";

export default function PostForm({ post, categories, category }) {
    const { supabase } = useSupabase();
    const router = useRouter();
    const featureImage = useRef();
    const formik = useFormik({
        initialValues: {
            title: post?.title ? post.title : "",
            slug: post?.slug ? post.slug : "",
            short_description: post?.short_description
                ? post.short_description
                : "",
            content: post?.content ? post.content : "",
            category: category?.category_id ? category.category_id : "",
        },
        onSubmit: handleSubmit,
    });
    async function handleSubmit(values) {
        // Uplaods Image if field has been filled
        if (featureImage.current.files.length > 0) {
            const { data, error } = await supabase.storage
                .from("posts")
                .upload(
                    `${formik.values.slug}.png`,
                    featureImage.current.files[0],
                    { upsert: true }
                );
        }

        //Add or Upserts post in post table
        if (post) {
            const { data } = await supabase
                .from("posts")
                .upsert({
                    id: post.id,
                    title: values.title,
                    slug: values.slug,
                    short_description: values.short_description,
                    content: values.content,
                })
                .select("*")
                .single();
            // Upserts item to post_to_category table
            const { data: postCategory } = await supabase
                .from("post_to_category")
                .upsert({
                    id: category.id,
                    post_id: data.id,
                    category_id: values.category,
                });
            // router.push("/admin/posts/" + data.id);
            router.refresh();
        } else {
            const { data } = await supabase
                .from("posts")
                .insert({
                    title: values.title,
                    slug: values.slug,
                    short_description: values.short_description,
                    content: values.content,
                })
                .select("*")
                .single();
            // Upserts item to post_to_category table
            const { data: postCategory } = await supabase
                .from("post_to_category")
                .insert({
                    // id: category.id,
                    post_id: data.id,
                    category_id: values.category,
                });
            router.push("/admin/posts/" + data.id);
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
                    <div className="flex justify-end gap-4">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        {post && (
                            <button
                                className="btn btn-error cursor-pointer"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const { data } = await supabase
                                        .from("posts")
                                        .delete()
                                        .match({ id: post.id });
                                    router.push("/admin/posts");
                                }}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Post Title</span>
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
                        <label className="label">Post Category</label>
                        <select
                            defaultValue={""}
                            className="select select-bordered w-full"
                            {...formik.getFieldProps("category")}
                        >
                            <option disabled value="">
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
                        {/* <div>
                            <Image src={}/>
                        </div> */}
                        <label className="label">
                            <span className="label-text">Upload File</span>
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
                        value={formik.values.content}
                        onChange={(content) => {
                            formik.setFieldValue("content", content);
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
