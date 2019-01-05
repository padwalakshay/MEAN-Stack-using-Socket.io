
function dbdetails(){

var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var dburl = 'mongodb://akshay:your@exampletestdbname';
return {"mongo":mongo,"url":dburl,"assert":assert};
}
module.exports = dbdetails;
