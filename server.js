var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;
/* loading js files into main module*/
var register = require('./service/register.js');
/* using dependent modules*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
	secret : 'dhby263et2ydbhbduydb@$@!^@',
	resave  :false,
	saveUninitialized : true
}))
//console.log(session);
app.use('/',express.static(__dirname))
/* creating static path for the following folders*/
/*app.use('/css',express.static(__dirname+'/css')); 
app.use('/jersey',express.static(__dirname+'/jersey'));
app.use('/scripts',express.static(__dirname+'/scripts'));
app.use('/js',express.static(__dirname+'/js'));
app.use('/html',express.static(__dirname+'/html'));*/
//app.use('./',express.static(__dirname))
/*routing to services*/
app.use('/register',register);

var userarry = [];
io.on('connection', function(socket){
//	console.log('connected')
	socket.on('user connected',function(user){
		//console.log('user logged in'+user);
		if(userarry.indexOf(user) == -1){
			socket.username = user;
		//	userarry.push(socket.username);
			
		}
	})
  socket.on('chat message', function(msg){
    io.emit('chat message', {msg:msg,name:socket.username});
  });
  function updateusername(){
  	socket.emit('users',userarry);
  }

  socket.on('disconnect',function(user){
  	/*console.log('hiiiiii')
      userarry.splice(userarry.indexOf(socket.username),1);
      console.log('done with splicing')
      updateusername();*/
     // console.log(socket.username)
      io.emit('chat message', {msg:'offline',name:socket.username});
  })
});


/*app.get('/dummy',function(req,res){
	res.sendFile('index.html',{root:'/html'});
	res.end();
})*/
/*app.get('/',function(req,res){
	res.sendFile('/index.html',{root: path.join(__dirname,'/html')});
	//res.send("Error");
//	res.end();
})*/

app.get('/',function(req,res){
	//res.sendFile('/login.html',{root: path.join(__dirname,'/html')});
	res.sendFile('/login.html',{root: path.join(__dirname,'/html')});
//	res.end();
})

http.listen(port, function(){
  console.log('listening on *:'+port);
});



