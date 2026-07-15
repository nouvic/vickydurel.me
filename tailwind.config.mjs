const channel = (name) => `rgb(var(${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: channel("--canvas"),
        panel: channel("--panel"),
        ink: channel("--ink"),
        muted: channel("--muted"),
        line: channel("--line"),
        brand: channel("--brand"),
        "brand-2": channel("--brand-2"),
        signal: channel("--signal")
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        float: "0 30px 90px -45px rgb(var(--shadow) / 0.55)",
        line: "0 0 0 1px rgb(var(--line) / 0.72)"
      },
      maxWidth: {
        frame: "82rem"
      }
    }
  },
  plugins: []
};

export default config;
