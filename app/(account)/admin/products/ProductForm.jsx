"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import DragAndDrop from "@/components/ui/DragAndDrop";
import { useFormik } from "formik";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Editor from "@/components/Editor";
import { slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ProductForm({ product, categories, bucket, category }) {
    const { supabase } = useSupabase();
    const router = useRouter();
    const productImageInput = useRef();
    const [imgArr, setImgArr] = useState(bucket ? bucket : []);
    const [jsonSpecifications, setJsonSpecifications] = useState(
        product?.json_specifications
            ? product.json_specifications
            : specificationPlaceholder
    );
    const formik = useFormik({
        initialValues: {
            title: product?.title ? product.title : "",
            slug: product?.slug ? product.slug : "",
            price: product?.price ? product.price : "",
            short_description: product?.short_description
                ? product.short_description
                : "",
            description: product?.description ? product.description : "",
            available: product?.available ? product.available : true,
            visible: product?.visible ? product.visible : true,
            category: category?.category_id ? category.category_id : "",
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
        const rand = Math.random() * (1000 - 100) + 100;

        if (product) {
            const { data: updatedProd, error } = await supabase
                .from("products")
                .update({
                    title: values.title,
                    slug: values.slug,
                    price: parseFloat(values.price),
                    short_description: values.short_description,
                    description: values.description,
                    json_specifications: jsonSpecifications,
                    available: values.available,
                    visible: values.visible,
                })
                .eq("id", product.id);
            imgArr.map(async (item, i) => {
                const { data, error } = await supabase.storage
                    .from("products")
                    .move(
                        `${product.id}/${item.name}`,
                        `${product.id}/${i + rand}.png`
                    );
                item.name = `${i + rand}.png`;
            });
            // Upserts item to product_to_category table
            if (category != null) {
                const { data: productCategory } = await supabase
                    .from("product_to_category")
                    .upsert({
                        id: category.id,
                        product_id: product.id,
                        category_id: values.category,
                    });
            } else {
                const { data: productCategory } = await supabase
                    .from("product_to_category")
                    .insert({
                        product_id: product.id,
                        category_id: values.category,
                    });
            }
            router.refresh();
        } else {
            const { data, error } = await supabase
                .from("products")
                .insert({
                    title: values.title,
                    slug: values.slug,
                    price: parseFloat(values.price),
                    short_description: values.short_description,
                    description: values.description,
                    json_specifications: jsonSpecifications,
                    available: values.available,
                    visible: values.visible,
                })
                .select("*")
                .single();
            imgArr.map(async (item, i) => {
                const { data: img, error } = await supabase.storage
                    .from("products")
                    .move(
                        `${product.id}/${item.name}`,
                        `${product.id}/${i + rand}.png`
                    );
                item.name = `${i + rand}.png`;
            });
            // Upserts item to product_to_category table
            const { data: productCategory } = await supabase
                .from("product_to_category")
                .insert({
                    // id: category.id,
                    product_id: data.id,
                    category_id: values.category,
                });
            router.push("/admin/products/" + data.id);
        }
    }

    return (
        <div className="grid grid-cols-1 ms:grid-cols-2 gap-4 md:min-h-[90vh]">
            {/* Product Form */}
            <div className="w-full p-2">
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-4 p-2"
                >
                    <div className="flex justify-between">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        {product && (
                            <>
                                <Link
                                    prefetch={false}
                                    href={"/products/" + product.slug}
                                    className="btn btn-outline"
                                >
                                    View
                                </Link>
                                <button
                                    className="btn btn-error cursor-pointer"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const { data } = await supabase
                                            .from("products")
                                            .delete()
                                            .match({ id: product.id });
                                        router.push("/admin/products");
                                    }}
                                >
                                    Delete
                                </button>
                            </>
                        )}
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
                                        console.log(
                                            slugify(formik.values.title)
                                        );
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
                    <div name="image" className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Images</span>
                        </label>
                        <div className="flex">
                            <input
                                disabled={product ? false : true}
                                ref={productImageInput}
                                type="file"
                                accept="image/png"
                                className="file-input file-input-bordered w-full focus:outline-none"
                            />
                            <button
                                disabled={product ? false : true}
                                className="btn btn-outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleUpload();
                                }}
                            >
                                Upload
                            </button>
                        </div>
                        {product && (
                            <DragAndDrop
                                path={product.id}
                                array={imgArr}
                                arraySetter={setImgArr}
                            />
                        )}
                    </div>
                    <div name="price" className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <div className="flex flex-col md:flex-row gap-2">
                            <input
                                type="number"
                                step={0.01}
                                min={0}
                                placeholder="Price"
                                className="input input-bordered w-full md:w-1/2 "
                                {...formik.getFieldProps("price")}
                            />
                            <label className="label cursor-pointer md:w-1/4 justify-start md:justify-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={formik.values.available}
                                    onChange={() =>
                                        formik.setFieldValue(
                                            "available",
                                            !formik.values.available
                                        )
                                    }
                                    className="checkbox"
                                />
                                <span className="label-text">Available</span>
                            </label>
                            <label className="label cursor-pointer md:w-1/4 justify-start md:justify-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={formik.values.visible}
                                    onChange={() =>
                                        formik.setFieldValue(
                                            "visible",
                                            !formik.values.visible
                                        )
                                    }
                                    className="checkbox"
                                />
                                <span className="label-text">Visible</span>
                            </label>
                        </div>
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
                    <div name="category" className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select
                            defaultValue={category ? category.category_id : ""}
                            className="select select-bordered w-full"
                            {...formik.getFieldProps("category")}
                        >
                            <option value="" selected>
                                None
                            </option>
                            {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Editor
                        value={formik.values.description}
                        onChange={(description) => {
                            formik.setFieldValue("description", description);
                        }}
                    />

                    <SpecificationInput
                        input={{ jsonSpecifications, setJsonSpecifications }}
                    />
                    <div className="flex justify-between">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const specificationPlaceholder = [
    { heading: "", rows: [{ key: "", value: "" }] },
];

const SpecificationInput = ({
    input: { jsonSpecifications: data, setJsonSpecifications: setData },
}) => {
    const baseTable = { heading: "", rows: [{ key: "", value: "" }] };
    const baseRow = { key: "", value: "" };
    // useEffect(() => {
    //     console.log(data);
    // }, [data]);
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
                            <div
                                key={j}
                                className="flex flex-col md:flex-row gap-1"
                            >
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full"
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
                                <div className="flex flex-nowrap gap-1">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRemoveRow(i, j);
                                        }}
                                        className="btn w-1/2 md:btn-square btn-outline btn-accent"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNewRow(i);
                                        }}
                                        className="btn w-1/2 md:btn-square btn-outline btn-accent"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
