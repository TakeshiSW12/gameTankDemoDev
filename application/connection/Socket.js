//package definition
var application = application || {}; 
application.connection = application.connection || {};
//--- end -- package definition--------------


application.connection.Socket = function(){};
 
//static method
application.connection.Socket.loadFile = function(url,obj){
	var socket = application.connection.Socket;
	socket.makeConnection(
		undefined,
		undefined,
		"GET",
		url,
			true,
		obj 
	);
};

//static method
application.connection.Socket.makeConnection = function(keys,values,method,url,async,obj){
	var formData = new FormData();
	if(keys && (keys instanceof Array) && keys.length>0){					
		for(var i in keys){
			formData.append(keys[i],values[i]); 		
		}	
	}				
	var oReq = new XMLHttpRequest();
	oReq.open(method,url,async);
	oReq.onreadystatechange = function(){
		obj.readyState 	= oReq.readyState;
		obj.status 		= oReq.status;
		if(
			oReq.readyState == 4 && 	
			oReq.status == 200			
		){  
			if(obj.onLoad && typeof(obj.onLoad)==="function"){
				obj.onLoad(oReq.responseText); 
			} 
		} 
	}; 
	oReq.addEventListener(
	"progress",
	function(chunk){
		if(obj.onProgress && typeof(obj.onProgress)==="function"){ 
			obj.onProgress(chunk);
		}		
	}, 
	true);	
	oReq.upload.addEventListener(
		"progress",
		function(chunk){ 

			if(obj.onProgress && typeof(obj.onProgress)==="function"){
				obj.onProgress(chunk);
			}

		}, 
		true
	); 
	oReq.send(formData);
};