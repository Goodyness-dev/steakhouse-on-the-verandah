/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FCFAF7',
          100: '#F7F3EB',
          200: '#EFECE6',
          300: '#E4DDD2',
          400: '#D5CABB',
          500: '#C2B4A1',
        },
        gold: {
          300: '#E4C988',
          400: '#D4B36A',
          500: '#B38E5D',
          600: '#9E7B45',
          700: '#856430',
        },
        charcoal: {
          700: '#3A3632',
          800: '#262422',
          900: '#1A1816',
          950: '#121110',
        },
        espresso: '#141311',
        porcelain: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel Decorative"', '"Bodoni Moda"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'pedestal': '18px 26px 50px -10px rgba(40, 30, 18, 0.18), 6px 10px 20px -4px rgba(40, 30, 18, 0.10)',
        'pedestal-hover': '22px 32px 60px -10px rgba(40, 30, 18, 0.24), 8px 14px 26px -4px rgba(40, 30, 18, 0.14)',
        'thick-dining': '0 20px 40px -15px rgba(26, 24, 22, 0.12), 0 0 0 1px rgba(179, 142, 93, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
