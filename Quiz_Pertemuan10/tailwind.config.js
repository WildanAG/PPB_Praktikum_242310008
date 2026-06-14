/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF4500", // A vibrant orange-red
        secondary: "#FF8C00", // Dark orange
        background: "#F9FAFB", // Light gray background
        surface: "#FFFFFF",
        text: "#1F2937", // Dark gray text
        muted: "#6B7280", // Muted text
      }
    },
  },
  plugins: [],
}
