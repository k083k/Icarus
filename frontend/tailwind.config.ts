import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tw-elements/js/**/*.js",

    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                'teacher-dash': "url('/images/image_5.jpg')",
                'admin-dash': "url('/images/image_4.jpg')",
                'footer-texture': "url('/img/footer-texture.png')",
            },
            fontFamily: {
                'nunito': ['Nunito Sans', 'sans-serif'],
            }
        },
    },
    dark: "class",
    plugins: [
        require("tw-elements/plugin.cjs"),
        require("tw-elements-react/dist/plugin.cjs")]
}
export default config;
