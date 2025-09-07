/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'hsl(220 20% 98%)',
        'accent': 'hsl(170 80% 45%)',
        'primary': 'hsl(240 80% 50%)',
        'surface': 'hsl(220 20% 100%)',
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
      },
      spacing: {
        'lg': '24px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 6px 18px hsla(0,0%,0%,0.1)',
      },
    },
  },
  plugins: [],
}