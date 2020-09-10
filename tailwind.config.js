module.exports = {
  purge: [],
  theme: {
    boxShadow: {
      inner: 'inset 0 4px 10px 3px rgba(0, 0, 0, 0.25)'
    },
    extend: {
      colors: {
        red: '#ff0000',
        green: '#008000',
        blue: '#0000ff',
        darkBlue: '#010082',
        darkRed: '#840003',
        cyan: '#038081',
        gray: {
          500: '#c0c0c0',
          600: '#808080'
        }
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    border: ['responsive', 'hover', 'focus', 'active'],
    borderColor: ['responsive', 'hover', 'focus', 'active'],
    boxShadow: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}
