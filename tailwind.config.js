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
        // Light Theme Colors (Cool Lavender & Lilac)
        rose: {
          DEFAULT: '#8B7BB8', // Cool Lavender / Lilac
          light: '#F4F0F9',
          soft: '#EBE5F2',
          dark: '#7363A3',
          deep: '#5C4E8A',
        },
        olive: {
          DEFAULT: '#768A9E', // Cool Slate Grey
          light: '#EEF2F6',
          dark: '#5E7082',
          deep: '#475666',
        },
        pear: {
          DEFAULT: '#8EA7BE', // Slate Accent
          light: '#F0F4F8',
          pill: '#E2E9F0',
          dark: '#6F879D',
        },
        cream: {
          DEFAULT: '#EBE5F2', // Soft Lilac Mist
          soft: '#F5F1FA',
          warm: '#F8F7FA',   // Page Background (Neutral)
        },
        plum: {
          DEFAULT: '#261E33', // Deep Obsidian Violet
          soft: '#5C526B',
          muted: '#827694',
          dark: '#1C1626',
          midnight: '#130F19',
        },

        // Dark Theme Colors (Midnight Amethyst & Cool Lavender)
        midnight: {
          DEFAULT: '#130F19', // Main Page Background (Deep)
          subtle: '#1A1523',  // Secondary background
          card: '#231C2D',    // Card Background (Soft)
          elevated: '#2E253A',// Elevated surfaces
          border: '#3D334D',  // Border line
        },
        champagne: {
          DEFAULT: '#B8A3D9', // Cool Lavender (Main & Button)
          hover: '#C7B5E3',   // Lavender hover
          soft: '#ECE7F4',    // Frosty Lavender Neutral
          glow: 'rgba(184, 163, 217, 0.35)',
        },
        darktext: {
          primary: '#ECE7F4',   // Heading Colour (Neutral)
          secondary: '#B8B0C7', // Secondary text
          muted: '#8D839E',     // Muted text
        },
        darksage: {
          DEFAULT: '#8EA7BE', // Cool Slate Grey Accent
          soft: 'rgba(142, 167, 190, 0.2)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        champagne: ['Champagne', '"Cormorant Garamond"', 'Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        'wedding': '0 10px 30px rgba(38, 30, 51, 0.08)',
        'wedding-lg': '0 20px 50px rgba(38, 30, 51, 0.12)',
        'rose-glow': '0 10px 25px rgba(139, 123, 184, 0.35)',
        'olive-glow': '0 10px 25px rgba(118, 138, 158, 0.35)',
        'champagne-glow': '0 10px 25px rgba(184, 163, 217, 0.35)',
      }
    },
  },
  plugins: [],
}
