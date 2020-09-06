module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        display: ['MuseoModerno', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
        '10xl': '8rem',
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'focus', 'active'],
    padding: ['responsive', 'hover'],
    margin: ['responsive', 'hover'],
  },
  plugins: [],
}
