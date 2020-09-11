const { environment } = require('@rails/webpacker')

environment.loaders.append('handlebars', {
  test: /\.hbs$/,
  loader: 'handlebars-loader' 
})

module.exports = environment
