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
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
