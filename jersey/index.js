var app = angular.module("RegsiterApp",[]);
app.controller("rogisterctr",main)

function main($http){  
     this.registeracc = function(){
     var username = this.username
	var password = this.password;
	var confirmpass = this.Confirmpassword;
	var companyname = this.company;
	if(username != undefined && password != undefined && companyname != undefined){
		if(username != "" && password != "" && companyname != ""){
		if(password == confirmpass){
			var Json = {"username":username,"password":password,"companyname":companyname}
	$http.post('/register/registeruser',Json)
	 	.then(function(response){
	 		populatedata(response.data);
	 	})
       }else{
 	    alert('password and confirm password mismatch')
       }
	 }else{
		alert('all Fields should be filled');
	   }
	 }else{
		alert('all Fields should be filled');
	   }
     	
     }
}

function populatedata(data){
	if(data.status == "OK"){
		window.location.href = '/html/login.html';
	}else{
		alert(data.message);
	}
}
