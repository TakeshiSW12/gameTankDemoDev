//package definition
var application = application || {}; 
application.controller = application.controller || {};
//--- end -- package definition--------------
application.controller.CanvasController = (
	function(){
		var instance = null;
		var _parent = null;
		CanvasController = function(canvas_game,canvas_buttons,parent){
			this._canvas_game 		= canvas_game;
			this._canvas_buttons 	= canvas_buttons;
			_parent 			= parent;//application.Main
			this.context 			= null;
			if(this._canvas_buttons && this._canvas_buttons.getContext){
				this.context = this._canvas_buttons.getContext("2d");
				if(this.context){
					this.context.clearRect(
						0,
						0,
						this._canvas_buttons.width,
						this._canvas_buttons.height
					); 
				}
			} 
			this._keyEvent 			= application.events.KeyEvent.getInstance();
			//this.gameApplication = application.game.Application.getInstance(this);
		};
		CanvasController.prototype = {
			constructor: application.controller.CanvasController,
			getContext:function(){
				return this.context;
			},
			getParent:function(){
				return _parent;
			},
			reset:function(){ 
				if(app)app.reset();
			},
			start:function(){
				this.load(); 
				this.run(); 
			},
			run:function(){   
					window.requestAnimationFrame(instance.run); 
					instance.paint(); 
			},
			load:function(){
				if(typeof file_status!="undefined"){
					file_status.style.display="none";
				} 
				if(app)app.load();
			},
			preRender:function(){
				application.utilities.Util.globalRand = Math.random(); 
				if(app)app.preRender(); 
			},
			render:function(){ 
				if(app)app.render();
			},
			postRender:function(){ 
				if(app)app.postRender();
			},
			paint:function(){
				if(!this._canvas_game){
					console.warn("no canvas_game");
					return;
				}
				//-----------------------------------------
				if(this._keyEvent && this._keyEvent.keyUps && this._keyEvent.keyUps["ku_27"]===true){  
					this.getParent().setPaused(!this.getParent().isPaused());
					this._keyEvent.keyUps["ku_27"] = false;
				}  
				//-----------------------------------------
				if(this.getParent().isPaused()){
					if(window.timer)window.timer.pauseClock();
					return;
				}
				this.preRender();
				this.render();
				this.postRender();
			},
			repaint:function(){
				instance.paint();
			},
			resize:function(e){ 
				if(app)app.onresize(e);
			},
			mousedown:function(e){ 
				if(app)app.mousedown(e);
			},
			mousemove:function(e){  
				if(app)app.mousemove(e);
			},
			mouseclick:function(e){  
				if(app)app.mouseclick(e);
			},
			mouseup:function(e){   
				if(app)app.mouseup(e);
			},
			touchstart:function(e){    
				if(app)app.touchstart(e); 
			},
			touchend:function(e){ 
				if(app)app.touchend(e);
			},
			touchcancel:function(e){ 
				if(app)app.touchcancel(e);
			},
			touchleave:function(e){ 
				if(app)app.touchleave(e);
			},
			touchmove:function(e){ 
				if(app)app.touchmove(e);
			}
		};

		return {
			getInstance:function(canvas_game,canvas_buttons,parent){
				if(!instance){
					instance = new CanvasController(canvas_game,canvas_buttons,parent);
				}
				return instance;
			}
		};
	}
)();