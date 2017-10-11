// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  var at = 0;
  var ch = json.charAt(at);
  var next = function() { 
    at++; 
    ch = json.charAt(at);
  };

  // booleans & null
  if (json === 'null') { return null; }
  if (json === 'true') { return true; }
  if (json === 'false') { return false; }

  // number
  if (!Number.isNaN(Number(json))) {
    return Number(json);
  }  

  // string
  if (json.startsWith('\"') && json.endsWith('\"')) {
    var output = '';
    next();
    while (at < json.length - 1) {
      if (ch === '\\') {
        next();
        if (ch === '\\') {
          output += '\\';
        }
        if (ch === '\"') {
          output += '\"';
        }
      } else {
        output += ch;
      }
      next();   
    }
    return output;
  }  

  

  var checkIfArray = function (str) {
    var opens = [];
    var closes = [];
    if (str[0] === '[' && str[str.length - 1] === ']') {
      for (var i = 0; i < str.length; i++) {
        if (str[i] === '[') {
          opens.push(str[i]);
        } else if (str[i] === ']') {
          closes.push(str[i]);
        }
      }
      return (opens.length === closes.length);
    }
    return false;
  };

  

  if (checkIfArray(json)) {
    var output = [];
    if (json.length > 2) {
      var arrayInner = json.slice(1, json.length - 1);
      arrayInner.split(',').forEach(function (el) {
        el = el.trim();
        output.push(parseJSON(el));
    
      });
    }
    //console.log(output);
    return output;
  }

};
