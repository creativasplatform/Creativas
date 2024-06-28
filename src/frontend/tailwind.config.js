const {nextui} = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./src/**/*.{js,ts,tsx,jsx,css}", 
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      fontSize: {
        'custom-p': ['18px', { lineHeight: '28px' }],
      },
      colors: {
        customblack:'#0c0b0b', 
        primary: '#10142b',
        'primary-ligth': '#272b40', // Color primary con opacidad 0.8
        secondary: '#6377db',
        'secondary-bright': '#8495e6', // Color secundario más brillante
        'secondary-ligth': '#8a9de8',
        green: '#b1e5e3',
        'green-ligth': '#effcf9',
        warning: '#b1e5e3',
        
      },
      fontSize: {
        'rem-8.75': '8.75rem',
      },
      spacing: {
        '7px': '7px',
      },
      rotate: {
        '45': '45deg',
        '135': '135deg',
      },
      translate: {
        'x-6': '1.5rem',
        'x-full': '100%',
      },
      opacity: {
        '100': '1',
        '0': '0',
      },
      backgroundColor: {
        'gray-1': '#D4D9E8',
        'gray-2': '#EAEEFB',
      },
      borderColor: {
        'stroke': '#D4D9E8',
      },
      textColor: {
        'body-color': '#333',
      },
      screens: {
        'xs': '450px',
        'sm': '768px',
        'md': '1024px',
        'lg': '1280px',
        'xl': '1536px',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: { 
        '500': '500ms',
      },
      transitionTimingFunction: { 
        'in-out': 'ease-in-out',
      },
      backgroundImage: {
        'gradient-to-b-custom': 'linear-gradient(to bottom, #0c0b0b, #10142b, #10142b, #0c0b0b)',
        'gradient-to-c-custom': 'linear-gradient(to bottom, #171D2E, #171D2E, #171D2E, #050B1C)',
        'gradient-custom': 'linear-gradient(to bottom, #171D2E, #0c0b0b)'
      },
      
    },
  },
  darkMode: "class",
  plugins: [nextui(), 'flowbite/plugin'],
};


