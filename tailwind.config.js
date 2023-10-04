/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: "class",
  content: [],
  variants: {},
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Roboto Mono', 'monospace']
      },
      width:{
        "40":"40%",
        "30":"30%",
        '25px': '25px'
      },
      height:{
        '25': '100px'
      },
      boxShadow: {
        "custom": '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
         'outline': '0 0 0 3px rgba(66, 153, 225, 0.5)'
      },
      backgroundColor: {
        'deepSpace': '#1E1E1E',
        'eclipse': '#3C3C3C',
        'ceruleanBlue': '#007ACC',
      },
      textColor: {
        'platinum': '#E5E5E5',
        'silverChalice': '#A4A4A4',
        'ceruleanBlue': '#007ACC',
        'ripeLemon': '#FFCC00',
        'crimson': '#DC143C',
        'forestGreen': '#228B22',
        'tango': '#FF4500',
      },
      borderColor: {
        'outerSpace': '#414A4C',
        'gunmetal': '#2C3539',
        "charcoalMist":"#343434",
        "CodeBlue":"#3b82f680"
      },
      boxShadow: {
        'soft': '0 4px 6px 0 rgba(0, 0, 0, 0.2)',
      },
    }
  },
  plugins: [],
}

