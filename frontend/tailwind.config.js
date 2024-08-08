/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX/TS/TSX files in the src directory
    "./index.html", // Include the main HTML file
  ],
  theme: {
    extend: {
      colors: {
        "color-primary": "var(--color-primary)",
        "color-danger": "var(--color-danger)",
        "color-success": "var(--color-success)",
        "color-warning": "var(--color-warning)",
        "color-white": "var(--color-white)",
        "color-info-dark": "var(--color-info-dark)",
        "color-dark": "var(--color-dark)",
        "color-light": "var(--color-light)",
        "color-dark-variant": "var(--color-dark-variant)",
        "color-background": "var(--color-background)",

        "color-liked": "var(--color-liked)",
        "color-saved": "var(--color-saved)",
      },
      boxShadow: {
        "box-shadow": "0 2rem 3rem var(--color-light)",
      },
      padding: {
        "card-padding": "1.8rem",
        "padding-1": "1.2rem",
      },

      screens: {
        xs: { max: "639px" }, // Mobile
        sm: { max: "767px" }, // Tablets
        md: { max: "1024px" }, // Larger Desktops
        // lg: { max: "1200px" }, // Small Desktops
      },
    },
    plugins: [],
  },
};
