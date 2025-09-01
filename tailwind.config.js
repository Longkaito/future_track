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
      "emerald",    // sáng (hiện tại)
      "dark",       // tối đơn giản
      "emerald",      // tối với xanh dương
      "forest",     // tối với xanh lá
      "business",   // tối chuyên nghiệp
    ],
    darkTheme: "dark", // đặt theme tối mặc định
  },
};