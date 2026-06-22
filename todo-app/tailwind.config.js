/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF7F0',
          raised: '#FFFFFF',
          line: '#E8E1D3'
        },
        ink: {
          DEFAULT: '#2A2826',
          soft: '#766F64'
        },
        terracotta: {
          DEFAULT: '#C1652F',
          soft: '#C1652F1A'
        },
        sage: {
          DEFAULT: '#6B8F71',
          soft: '#6B8F711A'
        },
        rust: {
          DEFAULT: '#C1543F',
          soft: '#C1543F1A'
        }
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
