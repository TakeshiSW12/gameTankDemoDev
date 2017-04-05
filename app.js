  
window.m 				= null;
window.app 				= null; 
window.facebookApp 		= null;
window._console 		= null;
window.volume_up 		= null;
window._volume_down 	= null;
window.__fileManager 	= null;
window.__audioManager 	= null;
window._life 			= null; 
window.fb_log_in   		= null;
window._timerUI   		= null;
window.timer 			= null;

window._gameFinish  	= null;
window._gStatus  		= null;
window._historyUI  		= null;

window.facebookApp = new application.facebook.Facebook();
window.facebookApp.init(document, 'script', 'facebook-jssdk');
	
window.onload = function(e){ 
 	window._console 	= document.getElementById("console");
 	window._volume_up 	= document.getElementById("volume_up");
 	window._volume_down = document.getElementById("volume_down");
 	window._life 		= document.getElementById("life");
 	window._gameFinish 	= document.getElementById("gameFinish");
 	window._gStatus 	= document.getElementById("gStatus");
 	window._timerUI 	= document.getElementById("timer");
 	window._historyUI 	= document.getElementById("historyUI");
 	window.timer = application.utilities.Timer.getInstance();
 	if(window._life){
 		window._life = window._life.children[0].children[0]; 
 	}
 	else{
 		window._life = null;
 	} 
	if(!Detector.webgl){
		alert("webgl does not support");
		return;
	} 
	 
	 //----------INICIO DE APLICATIVO CUANDO EL NAVEGADOR HA CARGADO SUS ARCHIVOS----
		window.__fileManager 	= application.files.FileManager.getInstance();
		window.__audioManager 	= application.audio.AudioManager.getInstance();
		window.app = new application.game.Application.getInstance();
		window.m = application.Main.getInstance();
		window.m.start(); 
		window.app.prepare(m);
	
	window.resizeFunc = function(e){
		e.preventDefault();  
		window.m.resize(e);
	};
	window.mouseClickFunc = function(e){
		e.preventDefault();
		window.m.mouseclick(e);
	};
	window.mouseDownFunc = function(e){
		e.preventDefault();
		window.m.mousedown(e);
	};
	window.mouseMoveFunc = function(e){
		e.preventDefault();
		window.m.mousemove(e);
	};
	window.mouseUpFunc = function(e){
		e.preventDefault();
		window.m.mouseup(e);
	};
	window.touchstartFunc = function(e){
		e.preventDefault();
		window.m.touchstart(e);
	};
	window.touchendFunc = function(e){
		e.preventDefault();
		window.m.touchend(e);
	};
	window.touchcancelFunc = function(e){
		e.preventDefault();
		window.m.touchcancel(e);
	};
	window.touchleaveFunc = function(e){
		e.preventDefault();
		window.m.touchleave(e);
	};
	window.touchmoveFunc = function(e){
		e.preventDefault();
		window.m.touchmove(e);
	}; 
	

	//------------------------------------------------------------
	
	//------------------------------------------------------------  
	window.addEventListener("resize",window.resizeFunc,false); 
	//------------------------------------------------------------

	window._volume_up.addEventListener("click",function(){window.__audioManager.addVolume(0.1);},false);
	window._volume_down.addEventListener("click",function(){window.__audioManager.addVolume(-0.1);},false); 
  
	window.fb_log_in = document.getElementById("fb_log_in");
	if(window.fb_log_in){
		window.fb_log_in.setAttribute("onlogin","javascript:facebookApp.click();"); 
		console.log("checking..."); 
		window.onfb_load = function(){
			console.log("loaded");
			window.facebookApp.check();
		};
		//---AQUI COMIENZA LA EJECUCIÓN DEL MÓDULO FACEBOOK-----
		window.fb_log_in.addEventListener("load",window.onfb_load,true);
	}  
 
}  