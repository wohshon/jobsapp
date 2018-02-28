var config = require("../config");
var util = {

  test: function(data) {
    console.log("debug: "+data + ' '+config.server+':'+config.port+' as '+config.user);
  },
  connectionPool:null

}
module.exports = util;
