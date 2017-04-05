//package definition
var application = application || {}; 
application.game = application.game || {};
//--- end -- package definition--------------
application.game.Application = (
	function(){
		var instance = null;

		//----private fields----
		var _scene = null;
		var _camera = null;
		var _renderer = null;
		var _screenUtil = null;
		var _main = null;
		var _time = Date.now();
		var _currentTime = Date.now(); 
		var _zMin = 70;
		var _zMax = 110;
		//--- end private fields---
		Application = function(){ 
			_screenUtil = application.game.utilities.Screen.getInstance(this);
		};
		Application.prototype ={
			constructor:application.game.Application,
			getGameStatus:function(){
				return this._components.getGameStatus();
			},
			getZMin:function(){
				return _zMin;
			},
			getZMax:function(){
				return _zMax;
			},
			prepare:function(main){
				_main = main; 
				this.WIDTH 	= _main.getWindowWidth();
				this.HEIGHT = _main.getWindowHeight();

				_screenUtil.setWidth(this.WIDTH);
				_screenUtil.setHeight(this.HEIGHT);

				_touchHandler = application.controller.touches.TouchHandler.getInstance(null);


				this._components = application.game.Components.getInstance(this);
				this._mouseMove 	= application.controller.mouse.MouseMove.getInstance(); 

				this.counter = 0;
			},
			getCamera:function(){
				return _camera;
			},
			setCamera:function(camera){
				_camera = camera;
			},
			getScene:function(){
				return _scene;
			},
			setScene:function(scene){
				_scene = scene;
			},
			getScreenUtil:function(){
				return _screenUtil;
			},
			getRenderer:function(){
				return _renderer;
			}, 
			load:function(){
				var _this = this;
				_camera = new THREE.PerspectiveCamera( 30, this.WIDTH / this.HEIGHT, 1, 10000 ); 
				_scene = new THREE.Scene();
				_renderer = new THREE.WebGLRenderer( { canvas:_main.getCanvasGame(),antialias: true,alpha:true } );
				//this.renderer.setClearColor( 0xADD8E6 );
				//this.renderer.setClearColor( 0xA9F5E1 );
				_renderer.setClearColor( 0x000000 );
				_renderer.setPixelRatio( window.devicePixelRatio );
				_renderer.setSize( this.WIDTH, this.HEIGHT );
				_renderer.shadowMap.enabled = true;
				//this.renderer.shadowMapEnabled = true;
				_renderer.shadowMapSoft = true;
				//this.renderer.shadowMapType = window.THREE.PCFSoftShadowMap;
				_renderer.shadowMap.type = THREE.PCFSoftShadowMap;  
				
				this._components.load(); 
			},
			reset:function(){
				this._components.reset();
			},
			preRender:function(){  
				var context = _main.getContext();
				if(context){
					context.clearRect(
						0,
						0,
						_screenUtil.getWidth(),
						_screenUtil.getHeight()
					); 
				} 
				
			},
			render:function(){
				_currentTime = Date.now();
				var dif = _currentTime - _time; 
				if(_renderer){
					_renderer.render( _scene, _camera ); 
					this._components.render(_time,_currentTime);					
				}
				_time = _currentTime;
			},
			postRender:function(){  
				this.counter += 0.005; 
				_touchHandler.paint(); 
				if(_screenUtil && !_screenUtil.isComputed()){
					_screenUtil.computeScreenBoundary3D();
				}
			},
			onresize:function(e){ 
				instance.WIDTH = _main.getWindowWidth();
				instance.HEIGHT = _main.getWindowHeight();
				if(instance.getCamera()){
					instance.getCamera().aspect = instance.WIDTH / instance.HEIGHT;
					instance.getCamera().updateProjectionMatrix();
					var positionY = instance.WIDTH>=instance.HEIGHT ? _zMin : _zMax;
					//instance.getCamera().position.set(0,positionY,0);
					instance.getCamera().position.y=positionY;
				}
				if(instance.getRenderer()){
					instance.getRenderer().setSize( instance.WIDTH, instance.HEIGHT ); 
				}  
				if(_screenUtil){
					_screenUtil.setWidth(instance.WIDTH);
					_screenUtil.setHeight(instance.HEIGHT);
					_screenUtil.setComputed(false);
					//_screenUtil.computeScreenBoundary3D();
				} 
				if(this._components)this._components.whenAppResize();

			},
			getMouseMovePosition3D:function(){
				return this._mouseMove.getPosition3D();
			},
			mousedown:function(e){  
				var btn = e.button;	 
				if(btn===0){ 
					this._components.setTankCanAttack(true);
				}
			},
			mouseup:function(e){  	
				var btn = e.button;	 
				if(btn===0){ 
					this._components.setTankCanAttack(false);
				} 		
				console.log("mouse up");
			},
			mouseclick:function(e){
			},
			mousemove:function(e){ 
 
				this._mouseMove.setClientX(e.clientX);
				this._mouseMove.setClientY(e.clientY);
				this._mouseMove.setAppWidth(instance.WIDTH);
				this._mouseMove.setAppHeight(instance.HEIGHT);
				//this._mouseMove.setPositionFrom(this.getCamera());  
			},
			touchstart:function(e){  
				_touchHandler.onTouchEvent(e,"start");
			},
			touchend:function(e){
				_touchHandler.onTouchEvent(e,"end");
			},
			touchcancel:function(e){
				_touchHandler.onTouchEvent(e,"cancel");
			},
			touchleave:function(e){
				_touchHandler.onTouchEvent(e,"leave");
			},
			touchmove:function(e){  
				_touchHandler.onTouchEvent(e,"move");
			} 
		};
		return {
			getInstance:function(){
				if(!instance){
					instance = new Application();
				}
				return instance;
			}
		};
	}
)();