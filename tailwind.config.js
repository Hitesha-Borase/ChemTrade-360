/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F3F9',
          100: '#E2E7F2',
          200: '#C5D0E6',
          700: '#1e293b',
          800: '#151f33',
          900: '#101828',
          950: '#0a0f1a'
        },
        gold: {
          50: '#FAF7F0',
          100: '#F4EDE0',
          200: '#E8DBC0',
          300: '#DCC9A0',
          400: '#D1B880',
          500: '#C6A66B',
          600: '#B08E4F',
          700: '#8C6F3B',
          800: '#695128',
          900: '#463518'
        },
        warm: {
          50: '#FFFFFF',
          100: '#FAF9F6',
          200: '#F7F6F2',
          300: '#EEECE4',
          400: '#E3DFD4'
        },
        slate: {
          text: '#667085',
          light: '#98A2B3',
          border: '#E4E7EC'
        },
        brand: {
          success: '#16805D',
          warning: '#B7791F',
          danger: '#C43232',
          info: '#2E6FBB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(16, 24, 40, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(16, 24, 40, 0.12)',
        'subtle': '0 1px 3px 0 rgba(16, 24, 40, 0.05), 0 1px 2px -1px rgba(16, 24, 40, 0.05)'
      },
      backdropBlur: {
        'glass': '12px'
      }
    },
  },
  plugins: [],
}

