export const Helpers = {
  toHTMLAttributes: function(data) {
    // only items which are objects have properties which can be used as attributes
		if( Object.prototype.toString.call(data) != "[object Object]" )
			return '';

		var keys = Object.keys(data),
		  s = "", propName, i;

		for( i=keys.length; i--; ){
			propName = keys[i];
			if( propName != 'class' && data.hasOwnProperty(propName) && data[propName] !== undefined )
				s += " " + propName + (data[propName] !== undefined ? `="${data[propName]}"` : "");
		}

		return s;
  },
}
