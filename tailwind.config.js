/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom styles
      scrollbar: {
        hide: {
          /* For Firefox */
          "scrollbar-width": "none",
          /* For Internet Explorer, Edge, and Webkit */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      },
    },
  },
  plugins: [],
};
