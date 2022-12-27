/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            main: "#144272",
            white: "#fff",
            black: "#000",
            red: "red",
            green: "green",
        },
    },
    plugins: [],
};
