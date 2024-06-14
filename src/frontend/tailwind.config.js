/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,tsx,jsx,css}", 
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  
  theme: {
    extend: {},
  },
  plugins: ['flowbite/plugin'],
}

