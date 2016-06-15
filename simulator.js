var locationGenerator = require('./locationGenerator');
var Appbase = require('appbase-js');
var Spinner = require('cli-spinner').Spinner;
var config = require('./config.json');
var appbaseRef = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: config.appbase.appname,
  username: config.appbase.username,
  password: config.appbase.password
})

var maxNumberOfNodes = 10;
var timeBetweenInsertions = 2000;

// enter demander's location into appbase table
function addNode(index, type) {
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
  appbaseRef.index(requestObject).on('data', function(response) {
    // console.log(" Inserted ", index);
    setTimeout(deleteNode.bind(null, index), (index + maxNumberOfNodes) * timeBetweenInsertions);
    setTimeout(generateNode.bind(null, index), (index + maxNumberOfNodes) * timeBetweenInsertions);
  }).on('error', function(error) {
    console.log(error);
  });
}

function deleteNode(index) {
  var requestObject = {
    type: config.appbase.type,
    id: index.toString()
  };
  appbaseRef.delete(requestObject).on('data', function(response) {
    // console.log(" Deleted ", index);
  }).on('error', function(error) {
    console.log(error);
  });
}

function generateNode(index) {
  var weight = Math.random();
  if (weight > 0.5)
    addNode(index, 'demander');
  else
    addNode(index, 'supplier');
}

// Randomly generate the demander & Supplier
for (var index = 0; index <= maxNumberOfNodes; index++) {
  setTimeout(generateNode.bind(null, index), index * timeBetweenInsertions);
}
console.log("Simulation has successfully started!")
var spinner = new Spinner('%s Simulating..');
spinner.setSpinnerString(18);
spinner.start();
