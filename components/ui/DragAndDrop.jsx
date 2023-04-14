"use client";
import { supabaseCDN } from "@/lib/supabase-cdn";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function DragAndDrop({ path, array, arraySetter }) {
    // const [arr, setArr] = useState(array);
    // const [arr, setArr] = useState(Array.from(Array(10).keys()));

    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    const handleSort = () => {
        let arrangeArr = [...array];
        const draggedItemContent = arrangeArr.splice(dragItem.current, 1)[0];
        arrangeArr.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        arraySetter(arrangeArr);
    };
    return (
        <div className="w-full flex flex-wrap bg-base-200 gap-2 p-2">
            {array.map((item, i) => (
                <div
                    key={i}
                    draggable
                    className="w-24 h-24 flex justify-center items-center bg-base-100"
                    onDragStart={(e) => (dragItem.current = i)}
                    onDragEnter={(e) => (dragOverItem.current = i)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <Image
                        src={supabaseCDN("products", path, item.name)}
                        width={50}
                        height={50}
                        alt={"prod " + i}
                    />
                </div>
            ))}
        </div>
    );
}
