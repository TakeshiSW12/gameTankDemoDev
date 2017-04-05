//package definition
var application = application || {}; 
//--- end -- package definition--------------
application.Main = (
	function(){
		var instance = null;
		Main = function(){ 
			this._canvasController 	= null;
			this._fileManager 		= application.files.FileManager.getInstance();
			this._touchHandler 		= application.controller.touches.TouchHandler.getInstance(this);
			this._keyEvent 			= application.events.KeyEvent.getInstance(); 
			this._canvas_game 		= window.document.createElement("canvas");
			this._canvas_buttons 	= window.document.createElement("canvas");

			this.WIDTH = 0;
			this.HEIGHT = 0;

			this._paused = false;

			this._isPlaying = false; 

		};
		Main.prototype = {
			constructor:application.Main,
			getFileManager : function(){
				return this._fileManager;
			},
			getCanvasGame:function(){
				return this._canvas_game;
			},
			getCanvasButtons:function(){
				return this._canvas_buttons;
			},
			isPaused:function(){
				return this._paused;
			},	
			setPaused:function(_paused){
				this._paused = _paused;
			},
			start:function(){
				if(this._keyEvent){
					this._keyEvent.install();
				}
				if(
					this._canvas_game && 
					this._canvas_buttons
				){
					//styling game canvas render---
					this._canvas_game.id="canvasGame";
					this._canvas_game.style.zIndex = 0;
					this._canvas_game.style.margin = 0;
					this._canvas_game.style.padding = 0;

					//styling canvas controller---
					this._canvas_buttons.id="canvasController";
					this._canvas_buttons.style.position="absolute";
					this._canvas_buttons.style.zIndex=1;
					this._canvas_buttons.style.margin=0;
					this._canvas_buttons.style.padding=0;
					this._canvas_buttons.style.top=0;
					this._canvas_buttons.style.left=0;
				
					document.getElementById("viewport").appendChild(this._canvas_game);
					document.getElementById("viewport").appendChild(this._canvas_buttons);

					this.WIDTH 	= window.innerWidth;
					this.HEIGHT = window.innerHeight;

					this._canvas_game.width = this._canvas_game.style.width 	= window.innerWidth;
					this._canvas_game.height = this._canvas_game.style.height 	= window.innerHeight;

					this._canvas_buttons.width 	= this._canvas_buttons.style.width 	= window.innerWidth;
					this._canvas_buttons.height 	= this._canvas_buttons.style.height = window.innerHeight;

					this._canvasController = application.controller.CanvasController.getInstance(this._canvas_game,this._canvas_buttons,this);


					if(application.utilities.Util.isMobile()){
						console.log("OCULTANDO CONTROL DE VOLUMEN");
						document.getElementById("volume").style.display="none";
					} 

					this.run();

				}
			},
			getWindowWidth:function(){
				return this.WIDTH;
			},
			getWindowHeight:function(){
				return this.HEIGHT;
			},
			getCanvasController:function(){
				return this._canvasController;
			},
			getContext:function(){
				return this.getCanvasController().getContext();
			},
			run:function(){ 
				this._fileManager.loadFiles(); 
				var _this = this;
				var interval = null;
				var check = function(){
					var obj,perc;
					var reached = true;
					var content_loaded = "";
					for(var i in _this._fileManager.getLists()){
						obj = _this._fileManager.getLists()[i];  
						if(obj.checked)continue;
						perc = parseFloat(obj.computePercent(),2)*100; 
						if(perc<=0)perc=0;
						content_loaded = "loading : "+obj.getURL()+", "+perc+"%" ;
						console.log(content_loaded); 
						if(typeof load_manager_obj=="function"){
							load_manager_obj(obj);
						} 
						if(obj.getType()=="json" || perc==100){
							obj.checked = true;
						} 
						reached = false;
					}
					if(reached){
						window.clearInterval(interval); 
						_this._fileManager.setLoaded(true);
						if(_this._canvasController ){
							//_this._canvasController.start();
							_this.showPlayFunction();  
						}
					}
				};
				interval = window.setInterval(check,500); 
			},
			showPlayFunction:function(){
				if(this._isPlaying===false){
					document.getElementById("play").style.display="inline-block";
					this.adjustPlayFunction();
				}
				
			},
			adjustPlayFunction:function(){
				if(this._isPlaying===false){
					var play 	= document.getElementById("play");
					var wWidth 	= window.innerWidth;
					var wHeight = window.innerHeight;
				
					var posX = (wWidth 	- play.offsetWidth 	)/2;
					var posY = (wHeight - play.offsetHeight )/2;

					play.style.left = posX+"px";
					play.style.top = posY+"px";

				}
			},
			adjustGameFinshFunction:function(){
				if(window._gameFinish){
					var display = window._gameFinish.style.display;
					if(display!="none"){
						var wWidth 	= window.innerWidth;
						var wHeight = window.innerHeight;
						
						var posX = ( wWidth 	- window._gameFinish.offsetWidth 	)/2;
						var posY = ( wHeight - window._gameFinish.offsetHeight 	)/2;

						window._gameFinish.style.left = posX+"px";
						window._gameFinish.style.top = posY+"px";
					}
				} 
			},
			play:function(){
				this._isPlaying = true;
				document.getElementById("play").style.display="none";
				this.addEvents();
				this._canvasController.start();  
			},
			reset:function(){
				this._canvasController.reset(); 
				this.addEvents();
			},
			saveHistory:function(){
				if(app){
					var data = app.getGameStatus();
					if(data){
						var data = JSON.stringify(data);
						var obj = {
							onLoad:function(response){
								console.log(response);
								response = JSON.parse(response);
								if(response.result=="ok"){
									//data guardada.
									return;
								}
								//contenido no guardado
							}
						};
						var keys 	= [];
						var values 	= [];

						keys.push("action");
						values.push("update");
						keys.push("data");
						values.push(data); 
						console.log(keys);
						console.log(values);
						application.connection.Socket.makeConnection(
							keys,
							values, 
							"POST",
							"./server/",
							true,
							obj
						);
					}
				}
			},
			showHistory:function(){
				var keys 	= [],
					values 	= [];
				keys.push("action");
				values.push("query");
				var _this = this;  
				var obj = {
					onLoad:function(response){
						console.log(response);
						_this.showHistoryUI(response);
					}
				};
				application.connection.Socket.makeConnection(
					keys,
					values, 
					"POST",
					"./server/",
					true,
					obj
				);
			},
			adjustHistoryUI:function(){
				if(window._historyUI){
					var display = window._gameFinish.style.display;
					if(display!="none"){
						var wWidth 	= window.innerWidth;
						var wHeight = window.innerHeight;

						var tmp_width;
						var tmp_height;

						if(wWidth>1000){
							tmp_width = 500;
						}else if(wWidth>700){
							tmp_width = 500;
						}else if(wWidth>600){
							tmp_width = 400;
						}else{
							tmp_width = wWidth - 10;
						}
						if(wHeight>1000){
							tmp_height = 500;
						}else if(wHeight>700){
							tmp_height = 500;
						}else if(wHeight>500){
							tmp_height = 400;
						}else{
							tmp_height = wHeight - 10;
						}

						window._historyUI.style.width 	= tmp_width	+ "px";
						window._historyUI.style.height 	= tmp_height+ "px";
							
						var posX = ( wWidth 	- tmp_width 	)/2;
						var posY = ( wHeight - tmp_height 	)/2;

						window._historyUI.style.left = posX+"px";
						window._historyUI.style.top = posY+"px";

					}
				} 
			},
			showHistoryUI:function(data){
				window.__data = data;
				if(window._historyUI){
					try{

						data = JSON.parse(data);
						data = JSON.parse(data.data); 
						if(Array.isArray(data) && data.length>0){
							var str = "<table>"; 
								str += "<tr>";
								str += "<th>ID</th>";
								str += "<th># Vida Restante</th>";
								str += "<th>Total Da&ntilde;o</th>";
								str += "<th># Enemigos Abatidos</th>";
								str += "<th>Tiempo Segundos Alcanzado</th>";
								str += "<th># Items Capturados</th>";
								str += "</tr>";
							for(var index in data){
								var _obj = data[index];
								str += "<tr>";
								for(var property in _obj){
									str += "<td>"+_obj[property]+"</td>";
								}
								str += "</tr>";
							} 
							str += "</table>";
							document.getElementById("hContent").innerHTML = str;
						}
  
						var wWidth 	= window.innerWidth;
						var wHeight = window.innerHeight;

						var tmp_width;
						var tmp_height;

						if(wWidth>1000){
							tmp_width = 500;
						}else if(wWidth>700){
							tmp_width = 500;
						}else if(wWidth>600){
							tmp_width = 400;
						}else{
							tmp_width = wWidth - 10;
						}
						if(wHeight>1000){
							tmp_height = 500;
						}else if(wHeight>700){
							tmp_height = 500;
						}else if(wHeight>500){
							tmp_height = 400;
						}else{
							tmp_height = wHeight - 10;
						}  

						window._historyUI.style.width 	= tmp_width	+ "px";
						window._historyUI.style.height 	= tmp_height+ "px";
							
						var posX = ( wWidth 	- tmp_width 	)/2;
						var posY = ( wHeight - tmp_height 	)/2;

						window._historyUI.style.left = posX+"px";
						window._historyUI.style.top = posY+"px";
						window._historyUI.style.display="inline-block";

					}catch(e){
						console.log(e.stack);
					}
					
				} 
			},
			addEvents:function(){
				
				//------------------------------------------------------------ 
				window.addEventListener("click",window.mouseClickFunc,true);
				window.addEventListener("mousedown",window.mouseDownFunc,false);
				window.addEventListener("mousemove",window.mouseMoveFunc,false);
				window.addEventListener("mouseup",window.mouseUpFunc,false);
				//------------------------------------------------------------ 
				window.addEventListener("touchstart",window.touchstartFunc, false);
				window.addEventListener("touchend", window.touchendFunc, false);
				window.addEventListener("touchcancel", window.touchcancelFunc, false);
				window.addEventListener("touchleave", window.touchleaveFunc, false);
				window.addEventListener("touchmove", window.touchmoveFunc, false); 
				//------------------------------------------------------------
			},
			removeEvents:function(){

				//------------------------------------------------------------ 
				window.removeEventListener("click",window.mouseClickFunc,true);
				window.removeEventListener("mousedown",window.mouseDownFunc,false);
				window.removeEventListener("mousemove",window.mouseMoveFunc,false);
				window.removeEventListener("mouseup",window.mouseUpFunc,false);
				//------------------------------------------------------------ 
				window.removeEventListener("touchstart",window.touchstartFunc, false);
				window.removeEventListener("touchend", window.touchendFunc, false);
				window.removeEventListener("touchcancel", window.touchcancelFunc, false);
				window.removeEventListener("touchleave", window.touchleaveFunc, false);
				window.removeEventListener("touchmove", window.touchmoveFunc, false); 
				//------------------------------------------------------------
			},
			resize:function(e){

				this.WIDTH 	= window.innerWidth;
				this.HEIGHT = window.innerHeight;   

				if(this._canvas_buttons){
					this._canvas_buttons.width 	= this._canvas_buttons.style.width 	= window.innerWidth;
					this._canvas_buttons.height 	= this._canvas_buttons.style.height = window.innerHeight; 
				}
				if(this._canvas_game){
					this._canvas_game.width 	= this._canvas_game.style.width 	= window.innerWidth;
					this._canvas_game.height = this._canvas_game.style.height 	= window.innerHeight; 
					this._canvasController.resize(e); 
				}
				this.adjustPlayFunction();
				this.adjustGameFinshFunction();
				if(window.timer){
					window.timer.adjustClockUI(); 
				}
				this.adjustHistoryUI();
			},
			mouseclick:function(e){
				//TODO aquí
				if(this._fileManager.isLoaded() && !instance.isPaused())this._canvasController.mouseclick(e); 
			},
			mousedown:function(e){
				//TODO aquí
				if(this._fileManager.isLoaded() && !instance.isPaused())this._canvasController.mousedown(e); 
			},
			mousemove:function(e){
				//TODO aquí
				if(this._fileManager.isLoaded() && !instance.isPaused()){
					this._canvasController.mousemove(e);  
				} 
			},
			mouseup:function(e){
				//TODO aquí
				if(this._fileManager.isLoaded() && !instance.isPaused())this._canvasController.mouseup(e); 
			},
			touchstart:function(e){ 
				if(this._fileManager.isLoaded() && !instance.isPaused())this._canvasController.touchstart(e); 
			},
			touchend:function(e){ 
				if(this._fileManager.isLoaded() && !instance.isPaused())this._canvasController.touchend(e); 
			},
			touchcancel:function(e){ 
				if(this._fileManager.isLoaded() && !instance.isPaused())this._canvasController.touchcancel(e); 
			},
			touchleave:function(e){ 
				if(this._fileManager.isLoaded() && !instance.isPaused())this._canvasController.touchleave(e); 
			},
			touchmove:function(e){ 
				if(this._fileManager.isLoaded() && !instance.isPaused())this._canvasController.touchmove(e);  
			} 
		};
		return {
			getInstance:function(){
				if(instance==null){
					instance = new Main();
				}
				return instance;
			}
		};
	}
)();