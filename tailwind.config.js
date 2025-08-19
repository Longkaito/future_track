/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  daisyui: {
    themes: [
      // chọn 2-3 theme trẻ trung, dễ switch
      "cupcake",   // pastel tươi
      "emerald",   // xanh hiện đại
      "dracula",   // dark mode phong cách
    ],
    darkTheme: "dracula",
  },
};