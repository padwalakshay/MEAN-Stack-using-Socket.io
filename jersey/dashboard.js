var socket = io();
var app = angular.module("IndexApp",[]);


app.controller("dashboardctr",Main);

function Main($http){
	if(sessionStorage.getItem('accname') != null){
		this.name = sessionStorage.getItem('accname');
	}else{
		window.location.href = '/html/login.html'
	}

this.sendchats = function(){
	if(this.inputsender != undefined){
		if(this.inputsender.trim() != ""){
	  	socket.emit('chat message',this.inputsender.trim());
		this.inputsender = "";
	  }
	}
	  
}


this.logout = function(){
$http.get('/register/logout')
	 	.then(function(response){
	 		populatedata(response.data);
	 	})
}

this.keyupfunct = function(e){
	if(this.inputsender != undefined){
	    if(e.key == "Enter" || e.keyCode == 13)
			{
			 if(this.inputsender.trim() != "")
			 {
		  	socket.emit('chat message',this.inputsender.trim());
			this.inputsender = "";
		    }
		  }
	  }  
   }
}

socket.emit('user connected',sessionStorage.getItem('accname'))

/*$("#sender").off().on('click',function(e){
	e.preventDefault();
	if($("#inputsender").val().trim() != ""){
    socket.emit('chat message',$("#inputsender").val());
	$("#inputsender").val('')
	}
	
 
 })*/


/*$("#inputsender").off().on('keyup',function(e){
if(e.key == "Enter" || e.keyCode == 13){
	if($("#inputsender").val().trim() != ""){
    socket.emit('chat message',$("#inputsender").val());
	$("#inputsender").val('')
	}
}
})*/

socket.on('chat message',function(msg){
	var myElement = angular.element( document.querySelector( '#chatwrapper' ) );
	myElement.append('<div style="margin-bottom:20px"><strong>'+msg.name+'</strong>:<div class="msg">'+msg.msg+'</div></div>')
	myElement[0].scrollTop = myElement[0].scrollHeight;
	//myElement.stop().animate({scrollTop:$("#chatwrapper")[0].scrollHeight},1000);
  })	

/*socket.on('users',function(arr){
	$('.list-group').empty();
	if(arr.length > 0){
		arr.map(function(rm){
			$('.list-group').append('<li class="list-group-item">'+rm+'</li>')
		})
	}
})*/



/*function logout(){
$.ajax({
		type:'GET',
		contentType:'application/json',
		url : '/register/logout',
		dataType :'json',
		success:function(data){
           
		},
		error:function(data){
            console.log(data)
		}
	})

}*/
/*function getallusers(){
		$.ajax({
		type:'GET',
		contentType:'application/json',
		url : '/register/getusers',
		dataType :'json',
		success:function(data){
            if(data.status == "OK"){
            	var arr = data.items;
            	if(arr.length != 0){
            		$(".list-group").empty();
            		$.each(arr,function(i,data){
                     $(".list-group").append('<li class="list-group-item">'+data.username+'</li>')
            		})
            	}
            }
		},
		error:function(data){
            console.log(data)
		}
	})

	}*/

	function populatedata(data){
          if(data.status == "OK"){
            	sessionStorage.removeItem('accname');
            	window.location.href = '/html/login.html'
            }
	}