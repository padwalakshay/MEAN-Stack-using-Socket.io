
var app = angular.module("LoginApp",[]);
app.controller("loginctr",function($http){
	this.mainmethod = function(){
     var username = this.username;
	 var password = this.password;
	 if(username != undefined && password != undefined){
		 	if(username != "" && password != ""){
			 	$http.post('/register/login',{"username":username,"password":password})
			 	.then(function(response){
			 		populatedata(response.data);
			 	})
			 }
	 }
		else{
			alert("all fields should be filled")
		} 
	}
})

function populatedata(data){
	if(data.status == "OK"){
		var user = data.items[0];
		sessionStorage.setItem('accname',user.username);
		window.location.href = '/html/index.html';
	}else{
		alert(data.message);
	}
}