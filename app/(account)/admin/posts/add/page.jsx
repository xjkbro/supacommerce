"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useSupabase } from "@/components/providers/supabase-provider";
import { supabaseCDN } from "@/lib/supabase-cdn";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
// import Lexical from "./Lexical";
export const revalidate = 0;

export default function AddPost() {
    const { supabase } = useSupabase();
    const router = useRouter();
    const editorRef = useRef(null);
    const featureImage = useRef();
    // const [isUploading, setIsUploading] = useState(false);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const formik = useFormik({
        initialValues: {
            title: "",
            slug: "",
            short_description: "",
            content: "",
        },
        onSubmit: handleSubmit,
    });

    async function handleUpload() {
        if (featureImage.current.files.length > 0) {
            const { data, error } = await supabase.storage
                .from("posts")
                .upload(
                    `${formik.values.slug}.png`,
                    featureImage.current.files[0]
                );
        }
    }
    async function handleSubmit(values) {
        // Add check for file with same name and replace

        if (featureImage.current.files.length > 0) {
            const { data, error } = await supabase.storage
                .from("posts")
                .upload(
                    `${formik.values.slug}.png`,
                    featureImage.current.files[0]
                );
        }
        const { data, error } = await supabase.from("posts").insert({
            title: values.title,
            slug: values.slug,
            short_description: values.short_description,
            content: editorRef.current.getContent(),
        });

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

                    <div name="image" className="form-control w-full">
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
                        tinymceScriptSrc={
                            process.env.NEXT_PUBLIC_URL +
                            "/tinymce/tinymce.min.js"
                        }
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        onEditorChange={(e) => {
                            console.log(e);
                        }}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "preview",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "image | code | removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                    />
                    <button onClick={log}>Log editor content</button>
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
