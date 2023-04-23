import React from "react";

export default async function Sandbox() {
    const posts = await getPosts();

    return <pre>{JSON.stringify(posts, null, 2)}</pre>;
}
const getPosts = async () => {
    const res = await fetch("http://localhost:3000/api/posts");
    return res.json();
};
