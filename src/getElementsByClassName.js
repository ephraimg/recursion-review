// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var output = [];
  var checkNodes = function(node) {
    if (node.classList && node.classList.contains(className)) {
      output.push(node);
    }
    if (node.hasChildNodes) {
      var children = node.childNodes;  
      for (var i = 0; i < children.length; i++) {
        checkNodes(children[i]);
      }
    }
  };
  checkNodes(document.body);
  return output;
};
  