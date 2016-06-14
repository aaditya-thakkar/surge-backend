var appbaseHelper = require('./appbaseHelper');

function nodeGenerator() {

  var maxNumberOfNodes = 1000;
  var indexArray = [];

  // Randomly generate the demander & Supplier
  for (var index = 0; index < maxNumberOfNodes; index++) {
    generateNode();
  }

  function generateNode() {
    var weight = Math.random();
    if (weight > 0.5) {
      appbaseHelper.index(index, 'demander');
      indexArray.push(index);
    } else {
      appbaseHelper.index(index, 'supplier');
      indexArray.push(index);
    }
    setTimeout(function() {
      appbaseHelper.delete(indexArray[0]);
      indexArray.splice(0, 1);
      generateNode();
    }, index * 1000);
  }

};

nodeGenerator();