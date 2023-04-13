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
            // "dark",
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
                    "--rounded-box": "0rem", // border radius rounded-box utility class, used in card and other large boxes
                    "--rounded-btn": "0rem", // border radius rounded-btn utility class, used in buttons and similar element
                    "--rounded-badge": "0rem", // border radius rounded-badge utility class, used in badges and similar
                    "--tab-radius": "0rem",
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
