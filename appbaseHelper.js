var locationGenerator = require('./locationGenerator');
var Appbase = require('appbase-js');
var config = require('./config.json');
var appbaseRef = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: config.appbase.appname,
  username: config.appbase.username,
  password: config.appbase.password
})
// timeout for a new demand after one is generated
var timeout = 1000;
module.exports = {
  // enter demander's location into appbase table
  index: function(index, type) {
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

    }, index * timeout);
  },
  delete: function(index) {
    setTimeout(function() {
      var requestObject = {
        type: config.appbase.type,
        id: index.toString()
      };

      appbaseRef.delete(requestObject).on('data', function(response) {
        console.log("deleted");
        console.log(response);
      }).on('error', function(error) {
        console.log(error);
      });
    }, index * timeout);
  }
};
