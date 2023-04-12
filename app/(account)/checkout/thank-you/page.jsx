import React from "react";
import Thanks from "./thanks";

export default async function ThankYou({ searchParams }) {
    console.log(searchParams.session_id);
    const data = await getSession(searchParams.session_id);
    console.log(data);
    return (
        <div>
            <Thanks searchParams={searchParams} />
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

const getSession = async (id) => {
    const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        body: JSON.stringify(id),
    });
    return res.json();
};
