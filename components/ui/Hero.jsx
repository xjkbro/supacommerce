import React from "react";

const content = [
    {
        title: "SupaCommerce",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor doloribus, ipsum dolorem autem quod iste. ",
    },
    { title: "ICP DAS USA", content: "Data Acquisition Made Easy." },
];

export default function Hero() {
    return (
        <>
            <div
                className="hero min-h-[80vh]"
                style={{
                    backgroundAttachment: "fixed",
                    backgroundImage: `url("https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80")`,
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            {content[0].title}
                        </h1>
                        <p className="mb-5">{content[0].content}</p>
                        <button className="btn btn-accent">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    );
}
