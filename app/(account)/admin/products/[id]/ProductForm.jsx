"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import DragAndDrop from "@/components/ui/DragAndDrop";
import { useFormik } from "formik";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import remarkGfm from "remark-gfm";
// import { v4 as uuidv4 } from "uuid";

// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
// import dynamic from "next/dynamic";

// const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
// import JSONInput from "react-json-editor-ajrm";
// import locale from "react-json-editor-ajrm/locale/en";
// import { Fragment } from "react";
import { Editor } from "@tinymce/tinymce-react";

const specificationPlaceholder = [
    { heading: "", rows: [{ key: "", value: "" }] },
];

export default function ProductForm({ product, bucket }) {
    const { supabase } = useSupabase();
    const editorRef = useRef(null);
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
                    <Editor
                        tinymceScriptSrc={
                            process.env.NEXT_PUBLIC_URL +
                            "/tinymce/tinymce.min.js"
                        }
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        // initialValue={description}
                        value={description}
                        onEditorChange={(value) => {
                            console.log(value);
                            setDescription(value);
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
                    {/* <MDEditor
                        value={description}
                        height={"500px"}
                        onChange={(val) => setDescription(val)}
                        preview="edit"
                        // extraCommands={[]}
                    /> */}

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
                    {/* <div
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
                    </div> */}

                    <SpecificationInput
                        input={{ jsonSpecifications, setJsonSpecifications }}
                    />
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

const SpecificationInput = ({
    input: { jsonSpecifications: data, setJsonSpecifications: setData },
}) => {
    // console.log(specifications);

    const baseTable = { heading: "", rows: [{ key: "", value: "" }] };
    const baseRow = { key: "", value: "" };
    // const [data, setData] = useState([
    //     {
    //         heading: "test header",
    //         rows: [
    //             { key: "test row1 key", value: "test row1 value" },
    //             { key: "test row2 key", value: "test row2 value" },
    //             { key: "test row3 key", value: "test row3 value" },
    //         ],
    //     },
    //     {
    //         heading: "test header2",
    //         rows: [
    //             { key: "test row1 key", value: "test row1 value" },
    //             { key: "test row2 key", value: "test row2 value" },
    //             { key: "test row3 key", value: "test row3 value" },
    //         ],
    //     },
    // ]);
    useEffect(() => {
        console.log(data);
    }, [data]);
    const handleInput = (event, tableIndex, rowIndex, type) => {
        const temp = [...data];
        switch (type) {
            case "heading":
                temp[tableIndex].heading = event.target.value;
                break;
            case "key":
                temp[tableIndex].rows[rowIndex].key = event.target.value;
                break;
            case "value":
                temp[tableIndex].rows[rowIndex].value = event.target.value;
                break;
        }
        setData(temp);
    };
    const handleNewTable = () => {
        const temp = [...data, baseTable];
        setData(temp);
    };
    const handleRemoveTable = (tableIndex) => {
        const temp = [...data];
        // delete temp[tableIndex];
        temp.splice(tableIndex, 1);
        setData(temp);
    };
    const handleNewRow = (tableIndex, rowIndex) => {
        const temp = [...data];
        temp[tableIndex].rows.push(baseRow);
        setData(temp);
    };
    const handleRemoveRow = (tableIndex, rowIndex) => {
        const temp = [...data];
        temp[tableIndex].rows.splice(rowIndex, 1);
        setData(temp);
    };

    return (
        <div name="specifications" className="form-control w-full">
            <label className="label" htmlFor="specification">
                <span className="label-text">Specifications</span>{" "}
                <button
                    className="btn btn-ghost text-sm"
                    onClick={() => setData([baseTable])}
                >
                    Restart Table
                </button>
            </label>
            {data.map((item, i) => (
                <div
                    key={i}
                    className=" flex flex-col gap-2 p-2 bg-slate-100 mb-2"
                >
                    <div className="flex gap-1">
                        <input
                            type="text"
                            placeholder="Table Heading"
                            className="input input-bordered w-full"
                            value={item.heading}
                            onChange={(e) => handleInput(e, i, null, "heading")}
                        />

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleRemoveTable(i);
                            }}
                            className="btn btn-square btn-outline btn-accent"
                        >
                            -
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleNewTable(i);
                            }}
                            className="btn btn-square btn-outline btn-accent"
                        >
                            +
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {item.rows.map((row, j) => (
                            <div key={j} className="flex gap-1">
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    value={row.key}
                                    onChange={(e) =>
                                        handleInput(e, i, j, "key")
                                    }
                                />
                                <textarea
                                    // type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full"
                                    value={row.value}
                                    onChange={(e) =>
                                        handleInput(e, i, j, "value")
                                    }
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleRemoveRow(i, j);
                                    }}
                                    className="btn btn-square btn-outline btn-accent"
                                >
                                    -
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNewRow(i);
                                    }}
                                    className="btn btn-square btn-outline btn-accent"
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
