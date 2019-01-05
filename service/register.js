var express = require('express');
var router = express.Router();
var path = require('path');
//var session = require('express-session');
var mongo = require('../modules/dbmodule.js')();
//console.log(mongo);
var url = mongo.url;
var mongoclient = mongo.mongo;
var assert = mongo.assert;


router.post('/registeruser',function(req,res){
//	console.log(req.body)
	mongoclient.connect(url,function(error,db){
	if(error){
		throw error;
	}else{
		//console.log(req.body.username)
		var temp = db.collection('users').find({"username":req.body.username});
	//	console.log(temp);
		var array = [];
		temp.forEach(function(doc,err){
          assert.equal(null,error);
          array.push(doc)
		},function(){
           if(array.length != 0){
			db.close();
			res.send({"status":"failed","message":"user already exist's"});
		}else{
           db.collection('users').insertOne(req.body,function(err,result){
		   assert.equal(null,err);
		   db.close();
		   res.send({"status":"OK","message":"Record Inserted"});
		   // res.sendFile('/login.html',{root: path.join(__dirname,'/html')});
		});
		}
		});	
		
		
	}
})
	
})


router.post('/login',function(req,res){
		mongoclient.connect(url,function(error,db){
	if(error){
		throw error;
	}else{
		//console.log(req.body.username)
		var temp = db.collection('users').find({"username":req.body.username,"password":req.body.password});
	//	console.log(temp);
		var array = [];
		temp.forEach(function(doc,err){
          assert.equal(null,error);
          array.push(doc)
		},function(){
           if(array.length == 0){
			db.close();
			res.send({"status":"failed","message":"invalid user"});
		}else{
           db.close();
           if(!req.session.username){
           	req.session.username = array[0].username
           }
           res.send({"status":"OK","items":array});
		}
		});	
		
		
	}
})
})


router.get('/getusers',function(req,res){
	if(req.session.username != null){
		mongoclient.connect(url,function(error,db){
	if(error){
		throw error;
	}else{
		var array = [];
		var temp = db.collection('users').find();
		temp.forEach(function(doc,err){
          assert.equal(null,error);
          array.push(doc)
		},function(){
			db.close();
			res.send({"items":array});
		})
	}
})
	}else{
		res.status(400);
		res.send({"status":"failed","message":"no session"});
	}
	
})



router.get('/logout',function(req,res){
	if(req.session.username != null){
      req.session.destroy();
	}
	res.send({"status":"OK"})
})
module.exports = router;