module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#2196f3',
        mainDark: '#0d47a1',
        mainLight: '#bbdefb',
        secondary: '#2196f3',
      },
      thema: {
        sofia: [
          'Cairo',
          'sans-serif',
          'Sofia',
          'cursive',
          'Work Sans',
          'sans-serif',
        ],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}
