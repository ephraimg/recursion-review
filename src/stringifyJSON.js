// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  
  if (typeof obj === 'number') {
    return obj.toString();
  }
  if (obj === null) {
    return 'null';
  }
  if (obj === true) {
    return 'true';
  } 
  if (obj === false) {
    return 'false';
  } 
  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }
  if (Array.isArray(obj)) {
    var output = '[';

    // output += stringifyJSON(obj.join(', '));

    for (var i = 0; i < obj.length; i++) {
      output += stringifyJSON(obj[i]);
      if (i !== obj.length - 1) {
        output += ',';
      }
    }
    output += ']';
    return output;
  }
  if (typeof obj === 'object' ) { 
    var output = '{';
    for (var key in obj) {
      if (typeof obj[key] === 'function' || obj[key] === undefined) {
        continue;
      }
      output += stringifyJSON(key) + ':' + stringifyJSON(obj[key]) + ',';
    }
    if (output[output.length - 1 ] === ',') {
      output = output.slice(0, output.length - 1);
    }
    output += '}';
    return output;
    
  }
  
};
