
function dbdetails(){

var mongo = require('mongodb').MongoClient;
var assert = require('assert');
//var dburl = 'mongodb://localhost:27017/akshaypadwaldb'
var dburl = 'mongodb://akshay:admin@ds231715.mlab.com:31715/akshaypadwaldb';
return {"mongo":mongo,"url":dburl,"assert":assert};
}
module.exports = dbdetails;