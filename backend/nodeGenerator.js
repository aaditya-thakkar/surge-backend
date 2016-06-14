var locationGenerator = require('./locationGenerator');
var appbaseRef = require('./appbase').appbaseRef;
var config = require('../config.json');

module.exports = function nodeGenerator(){
  // timeout for a new demand after one is generated
  var timeout = 1000;
  var maxNumberOfNodes = 1000;
  var indexArray = [];

  // Randomly generate the demander & Supplier
  for (var index = 0; index < maxNumberOfNodes; index++){
    generateNode();
  }

  function generateNode(){
    var weight = Math.random();
    if(weight>0.5){
      indexIntoAppbase(index, 'demander');
      indexArray.push(index);
    }
    else {
      indexIntoAppbase(index, 'supplier');
      indexArray.push(index);
    }
    setTimeout(function() {
      deleteFromAppbase(indexArray[0]);
      indexArray.splice(0,1);
      generateNode();
    },index*1000);
  }

  // enter demander's location into appbase table
  function indexIntoAppbase(index, type){
    setTimeout(function() {
      var latLongData = {
        object_type: type,
        location: [parseFloat(locationGenerator.generateLatLong().long), parseFloat(locationGenerator.generateLatLong().lat)]
      };

      var requestObject = {
        type: config.appbase.type,
        id: index.toString(),
        body: latLongData,
      };
      // appbase index query
      var addedDemand = appbaseRef.index(requestObject).on('data', function(response) {
        console.log(response);
      }).on('error', function(error) {
        console.log(error);
      });

    }, index*timeout);
  }

  function deleteFromAppbase(index) {
    setTimeout(function() {
    var requestObject = {
      type: config.appbase.type,
      id: index.toString()
    };

    appbase.appbaseRef.delete(requestObject).on('data', function(response) {
      console.log("deleted");
      console.log(response);
    }).on('error', function(error) {
      console.log(error);
    });
  }, index*timeout);
  }
};
