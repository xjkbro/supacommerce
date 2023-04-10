/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            "light",
            "dark",
            "bumblebee",
            "emerald",
            "corporate",
            "synthwave",
            "retro",
            "lofi",
            "black",
            "luxury",
            "cmyk",
            "autumn",
            "business",
            "coffee",
            {
                icp: {
                    primary: "#008ecc",
                    secondary: "#005980",
                    accent: "#fc7019",
                    neutral: "#111827",
                    "base-100": "#fafafb",
                    info: "#374151",
                    success: "#16a34a",
                    warning: "#eab308",
                    error: "#b91c1c",
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
