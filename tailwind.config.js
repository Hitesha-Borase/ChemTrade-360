/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reference Color Palette
        forest: {
          950: '#042a22',
          900: '#063F32', // Deep Forest Green
          800: '#075C46', // Dark Emerald
          700: '#0F795C', // Jade Green
          600: '#148C6B',
          500: '#1E9E7C',
          200: '#B6D7CA',
          100: '#DDE9D9', // Soft Sage Green
          50: '#F0F5EE',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FAF8F2',
          200: '#F7F5EC', // Warm Ivory
          300: '#ECE9DC',
        },
        sage: {
          50: '#F4F7F2',
          100: '#DDE9D9', // Soft Sage Green
          200: '#C7D9C2',
          300: '#A9C2A3',
        },
        gold: {
          accent: '#C6A66A', // Champagne Gold
          50: '#FAF7F0',
          100: '#F4EDE0',
          500: '#C6A66A',
          600: '#B08E4F',
          700: '#8C6F3B'
        },
        darkText: '#17372F', // Dark Text
        mutedText: '#7A8980', // Muted Gray-Green
        softBorder: '#E3E8DF', // Soft Border
        // Backward-compatible mappings
        navy: {
          50: '#F0F5EE',
          100: '#DDE9D9',
          200: '#B6D7CA',
          700: '#0F795C',
          800: '#075C46',
          900: '#063F32',
          950: '#042a22'
        },
        warm: {
          50: '#FFFFFF',
          100: '#FAF8F2',
          200: '#F7F5EC',
          300: '#ECE9DC',
          400: '#E3E8DF'
        },
        slate: {
          text: '#7A8980',
          light: '#A0ACA4',
          border: '#E3E8DF'
        },
        brand: {
          success: '#0F795C',
          warning: '#B7791F',
          danger: '#C43232',
          info: '#2E6FBB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(6, 63, 50, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(6, 63, 50, 0.12)',
        'subtle': '0 1px 3px 0 rgba(6, 63, 50, 0.05), 0 1px 2px -1px rgba(6, 63, 50, 0.05)'
      },
      backdropBlur: {
        'glass': '12px'
      }
    },
  },
  plugins: [],
}
