

document.write('<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>')

//document.write('<script type="text/javascript" src="/js/bootstrap.min.js"></script>');

if(pageName){
	if(pageName == "register"){
	document.write('<script type="text/javascript" src="/jersey/index.js"></script>');
 }
 else if(pageName == "login"){
	document.write('<script type="text/javascript" src="/jersey/login.js"></script>');
 }
 else if(pageName == "index"){
 //	document.write('<script type="text/jvascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular-animate.js"></script>')
 	document.write('<script type="text/javascript" src="/socket.io/socket.io.js"></script>');
 	document.write('<script type="text/javascript" src="/jersey/dashboard.js"></script>');
 }
}

/*document.write('<script type="text/javascript" src="/socket.io/socket.io.js"></script>');
*/