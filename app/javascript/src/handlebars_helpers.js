const Handlebars = require('handlebars/runtime');
Handlebars.registerHelper('ternary', function(test, yes, no) {
  return test ? yes : no;    
});
module.exports = Handlebars;
