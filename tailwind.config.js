/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Light Theme (Preserved untouched)
        rose: {
          DEFAULT: '#C98271', // Dusty Rose
          light: '#FBF0ED',
          soft: '#F5E2DD',
          dark: '#B36F5F',
          deep: '#965345',
        },
        olive: {
          DEFAULT: '#67724A', // Olive Green
          light: '#F2F5EC',
          dark: '#505A36',
          deep: '#3A4325',
        },
        pear: {
          DEFAULT: '#C2CCA8', // Soft Pear Green
          light: '#F4F7EE',
          pill: '#EBF0DF',
          dark: '#9FA985',
        },
        cream: {
          DEFAULT: '#FFEDDC', // Cream White
          soft: '#FFF9F3',
          warm: '#FAF5EE',
        },
        plum: {
          DEFAULT: '#4F3730', // Plum Brown
          soft: '#70554D',
          muted: '#8E736B',
          dark: '#3B2822',
          midnight: '#1F1614',
        },

        // Midnight Champagne Luxury Dark Theme
        midnight: {
          DEFAULT: '#101820', // Main background
          subtle: '#151F28',  // Secondary background
          card: '#1B2732',    // Card background
          elevated: '#24313B',// Elevated surfaces
          border: '#34424C',  // Border
        },
        champagne: {
          DEFAULT: '#D6B878', // Champagne gold
          hover: '#E6CC91',   // Gold hover
          soft: '#F5EAD4',
          glow: 'rgba(214, 184, 120, 0.35)',
        },
        darktext: {
          primary: '#F1EBDD',   // Primary text
          secondary: '#C1C5C4', // Secondary text
          muted: '#A0AAA9',     // Muted text
        },
        darksage: {
          DEFAULT: '#A6B3A1', // Sage accent
          soft: 'rgba(166, 179, 161, 0.2)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'wedding': '0 10px 30px rgba(79, 55, 48, 0.08)',
        'wedding-lg': '0 20px 50px rgba(79, 55, 48, 0.12)',
        'rose-glow': '0 10px 25px rgba(201, 130, 113, 0.35)',
        'olive-glow': '0 10px 25px rgba(103, 114, 74, 0.35)',
        'champagne-glow': '0 10px 25px rgba(214, 184, 120, 0.35)',
      }
    },
  },
  plugins: [],
}
