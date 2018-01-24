 // this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  // booleans & null
  if (json === 'null') { return null; }
  if (json === 'true') { return true; }
  if (json === 'false') { return false; }

  // number
  if (!Number.isNaN(Number(json))) {
    return Number(json);
  }  

  // helpers for parsing strings
  var at = 0;
  var ch = json.charAt(at);
  var next = function() { 
    at++; 
    ch = json.charAt(at);
  };

  // string
  if (json.startsWith('\"')) { 
    var output = '';
    next();
    var escapeCount = 0;
    while (at < json.length - 1) {
      if (ch === '\\') {
        escapeCount++;
        next();
        if (ch === '\\') {
          escapeCount++;
          output += '\\';
        }
        if (ch === '\"') {
          escapeCount = 0;
          output += '\"';
        }
      } else {
        escapeCount = 0;
        output += ch;
      }
      next();   
    }
    if (ch !== '\"' || escapeCount % 2 === 1) {
      throw new SyntaxError;
    } else {
      return output;
    }
  }  

  // array
  if (json[0] === '[') {
    if (json[json.length - 1] === ']') {
      var output = [];
      if (json.length > 2) {
        var arrayInner = json.slice(1, json.length - 1);
        arrayInner.split(',').forEach(function (el) {
          el = el.trim();
          output.push(parseJSON(el));
        });
      }
      return output;
    } else {
      throw new SyntaxError('Invalid JSON (unmatched brackets)');
    }
  }

  // object
  if (json[0] === '{') {
    if (json[json.length - 1] === '}') {
      var output = {};
      // if (json.length > 2) {
      //   var objectInner = json.slice(1, json.length - 1);
      //   objectInner.split(',').forEach(function (el) {
      //     el = el.trim();
      //     output.push(parseJSON(el));
      //   });
      // }
      return output;
    } else {
      throw new SyntaxError('Invalid JSON (unmatched brackets)');
    }
  }

};
