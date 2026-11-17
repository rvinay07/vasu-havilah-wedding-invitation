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
        // WedBuild Palette Specification
        rose: {
          DEFAULT: '#C08A8F', // Main / Primary Colour / Button Background
          light: '#F8F1F2',
          soft: '#EFE6E7',
          dark: '#A87277',
          deep: '#8F5A60',
        },
        olive: {
          DEFAULT: '#C0A08A', // Secondary Colour / Accent
          light: '#F8F3F0',
          soft: '#EFE7E2',
          dark: '#A88771',
          deep: '#8F6F59',
        },
        pear: {
          DEFAULT: '#DDCFD1', // Soft
          light: '#F7F3F4',
          pill: '#EDE3E5',
          dark: '#C7B5B8',
        },
        cream: {
          DEFAULT: '#F6F4F4', // Neutral / Page Background
          soft: '#FCFAFA',
          warm: '#F6F4F4',    // Page Background
        },
        plum: {
          DEFAULT: '#322526', // Deep / Heading Colour / Button Text
          soft: '#544445',
          muted: '#7A696A',
          dark: '#24191A',
          midnight: '#181011',
        },

        // Midnight & Deep Luxury Dark Theme (Adapted from Palette)
        midnight: {
          DEFAULT: '#1D1516', // Deep plum canvas background
          subtle: '#261D1E',  // Subtle deep surface
          card: '#322526',    // Deep #322526 card surface
          elevated: '#413234',// Elevated surface
          border: '#564345',  // Subtle dark border
        },
        champagne: {
          DEFAULT: '#C08A8F', // Main #C08A8F accent
          hover: '#D4A3A7',   // Hover glow
          soft: '#DDCFD1',    // Soft #DDCFD1
          glow: 'rgba(192, 138, 143, 0.40)',
        },
        darktext: {
          primary: '#F6F4F4',   // Neutral #F6F4F4 primary text
          secondary: '#DDCFD1', // Soft #DDCFD1 secondary text
          muted: '#A59496',     // Muted text
        },
        darksage: {
          DEFAULT: '#C0A08A', // Accent #C0A08A
          soft: 'rgba(192, 160, 138, 0.25)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'wedding': '0 10px 30px rgba(50, 37, 38, 0.08)',
        'wedding-lg': '0 20px 50px rgba(50, 37, 38, 0.12)',
        'rose-glow': '0 10px 25px rgba(192, 138, 143, 0.40)',
        'olive-glow': '0 10px 25px rgba(192, 160, 138, 0.40)',
        'champagne-glow': '0 10px 25px rgba(192, 138, 143, 0.40)',
      }
    },
  },
  plugins: [],
}
