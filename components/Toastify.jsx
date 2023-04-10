"use client";
import React, { useState, useContext } from "react";

// export function sendToast(message, duration, type) {
//     setToast({
//         active: true,
//         msg: "User Details was successfully changed.",
//         type: "success",
//     });
//     setTimeout(() => {
//         setToast({
//             active: false,
//             msg: "",
//             type: "",
//         });
//     }, 1000);
// }

export default function Toastify() {
    const [toast, setToast] = useState({ active: false, msg: "", type: "" });

    return (
        <div
            className={
                " toast toast-top toast-end transition-all " +
                (toast.active ? "opacity-100" : "opacity-0")
            }
        >
            <div
                className={clsx(
                    "alert",
                    toast.type == "success" && "alert-success",
                    toast.type == "error" && "alert-error"
                )}
            >
                <div>
                    <span>{toast.msg}</span>
                </div>
            </div>
        </div>
    );
}
