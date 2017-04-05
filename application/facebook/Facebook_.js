//package definition
var application = application || {}; 
//--- end -- package definition--------------
//class Facebook
application.Facebook = function(){
	this.url = "";
}; 
application.Facebook.prototype = {
	constructor:application.Facebook,
	connect:function(side,keys,values){
		var cond = false;
		if(side=="serv_s"){
			this.url = window.location.origin + "/connectbyFB";
			application.connection.Socket.makeConnection(keys,values,"POST",this.url,true,this.onload,undefined,"d");
		}
		else if(cond){

		}
		else{

		}
	},
	onload:function(res){
		console.log(res);
		try{
			res = JSON.parse(res);
			if(res.result=="ok"){  
				console.log("ud está logueado"); 
			}
		}catch(e){

		}
		
	},
	init:function(d, s, id) {
		var parent = this;
		//document, 'script', 'facebook-jssdk';
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);

		//this.async();
		var _this = this;
		window.fbAsyncInit = function() {
			FB.init({
				appId      : '1646565378909630',
				cookie     : true,  
				xfbml      : true,  
				version    : 'v2.4'  
			});   
		};
	},
	check:function(){
		var parent = this;
		FB.getLoginStatus(function(response) {
			if(response.status==="connected"){
				parent.click();
			} 
			console.log(response);
		}); 
	},
	click : function(){ 
		var _this = this;
		console.log("trigger click");
		FB.getLoginStatus(function(response) {
			_this.statusChangeCallback(response);
		}); 
	},	
	statusChangeCallback : function(response) {   
		if (response.status === 'connected') { 
			this.processResponse(response);
		} else if (response.status === 'not_authorized') { 
			//cannot enter
		} else { 
			//cannot enter	
		}
	}, 
	processResponse:function(authResponse) { 
		var _this = this;
		FB.api('/me',{ locale: 'en_US', fields: 'id' }, function(response) {
			
			window.responseFB = response;
			console.log(authResponse);
			console.log(response);
			
			var keys = [];
			var values = [];
			
			keys.push("access_token");
			keys.push("authResult");
			keys.push("content_json");
			
			values.push(authResponse.authResponse["accessToken"]); 
			values.push(JSON.stringify(authResponse)); 
			values.push(JSON.stringify(response));  
			
			if(typeof facebookApp=="object"){
				_this.connect("serv_s",keys,values);
			}
			 
		});
	}
}; 
