var config = require('../config.json');
var request = require('request');
var appname = config.appbase.appname;
var type = config.appbase.type;

// Update the mapping of location to geo_point
request({
  url: 'http://scalr.api.appbase.io/' + appname + '/_mapping/' + type + '?ignore_conflicts=true',
  headers: {
    Authorization: 'Basic ' + new Buffer(config.appbase.username + ':' + config.appbase.password).toString('base64')
  },
  json: {
    "coordinates": {
      "properties": {
        "location": {
          "type": "geo_point"
        }
      }
    }
  },
  method: 'PUT'
}, function(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(response.statusCode, body);
  }
});
