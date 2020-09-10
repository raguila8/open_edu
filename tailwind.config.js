module.exports = {
    purge: [
    './app/**/*.html.erb',
    './app/helpers/**/*.rb',
    './src/**/*.html',
    './src/**/*.jsx',
    './app/**/*.js',
    './app/**/*.js.erb',
    './app/**/*.scss',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
      },
    },
    inset: {
      '0': 0,
      auto: 'auto',
      '1/2': '50%',
      '64': '16rem',
    },
  },
  variants: {},
  experimental: { 
    applyComplexClasses: true, 
  },
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/typography')],
}
