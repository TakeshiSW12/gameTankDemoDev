//package definition
var application = application || {}; 
application.game = application.game || {}; 
application.game.utilities = application.game.utilities || {}; 
//--- end -- package definition--------------

application.game.utilities.Screen = (
	function(){
		var instance = null;
		Screen = function(parent){ 
			this._parent = parent;//application.game.Application 
			//referencia para proyecciones de cuadro.
			this.vLeftTop 		= new THREE.Vector3(-1, 1,0.5);
			this.vLeftBottom 	= new THREE.Vector3(-1,-1,0.5);
			this.vRightBottom 	= new THREE.Vector3( 1,-1,0.5);
			this.vRightTop 		= new THREE.Vector3( 1, 1,0.5);

			this.leftTopBoundary 		= new THREE.Vector3(); 
			this.leftBottomBoundary 	= new THREE.Vector3(); 
			this.rightTopBoundary 		= new THREE.Vector3(); 
			this.rightBottomBoundary 	= new THREE.Vector3(); 

			this._width = 0;
			this._height = 0;

			this._computed = false;

			this._platformWidth = 200;
			this._platformHeight = 200;

			this._platformHalfWidth = this._platformWidth/2;
			this._platformHalfHeight = this._platformHeight/2;

		};
		Screen.prototype = { 
			constructor:application.game.utilities.Screen,
			getPlatformWidth:function(){
				return this._platformWidth;
			},
			getPlatformHeight:function(){
				return this._platformHeight;
			},
			getPlatformHalfWidth:function(){
				return this._platformHalfWidth;
			},
			getPlatformHalfHeight:function(){
				return this._platformHalfHeight;
			},
			setWidth:function(w){
				this._width = w;
			},
			setHeight:function(h){
				this._height = h;
			},
			getWidth:function(){
				return this._width;
			},
			getHeight:function(){
				return this._height;
			},
			getParent : function(){
				return this._parent;
			},
			isComputed:function(){
				return this._computed;
			},
			setComputed:function(computed){
				this._computed = computed;
			},
			isOutScreen:function(obj){
				var check = false;
				if(obj && (obj.position || obj.getPosition)){
					var _pos = obj.position || obj.getPosition();
					check = 
						_pos.x< this.leftTopBoundary.x || 
						_pos.x> this.rightTopBoundary.x || 
						_pos.z> this.leftBottomBoundary.z || 
						_pos.z< this.leftTopBoundary.z  ;
				} 
				return check;
			},
			computeScreenBoundary3D:function(){
				var x,y,z,t;
				var camera = this.getParent().getCamera();
				//---------------------------------------------------------
				//LEFT TOP
				//---------------------------------------------------------
				var temp_vector = this.vLeftTop.clone();

				temp_vector.unproject(camera); 
				temp_vector.sub(camera.position); 
				temp_vector.normalize(); 

				t = (-1)*camera.position.y/temp_vector.y; 
				x = camera.position.x + t*temp_vector.x;
				z = camera.position.z + t*temp_vector.z;
				y = 0; 

				this.leftTopBoundary.set(x,y,z);
				//---------------------------------------------------------
				//LEFT BOTTOM
				//---------------------------------------------------------
				temp_vector = this.vLeftBottom.clone();
				temp_vector.unproject(camera); 
				temp_vector.sub(camera.position); 
				temp_vector.normalize(); 

				t = (-1)*camera.position.y/temp_vector.y; 
				x = camera.position.x + t*temp_vector.x;
				z = camera.position.z + t*temp_vector.z;
				y = 0; 

				this.leftBottomBoundary.set(x,y,z);
				//---------------------------------------------------------
				//RIGHT BOTTOM
				//---------------------------------------------------------
				temp_vector = this.vRightBottom.clone();
				temp_vector.unproject(camera); 
				temp_vector.sub(camera.position); 
				temp_vector.normalize(); 

				t = (-1)*camera.position.y/temp_vector.y; 
				x = camera.position.x + t*temp_vector.x;
				z = camera.position.z + t*temp_vector.z;
				y = 0; 

				this.rightBottomBoundary.set(x,y,z);
				//---------------------------------------------------------
				//RIGHT TOP
				//---------------------------------------------------------
				temp_vector = this.vRightTop.clone();
				temp_vector.unproject(camera); 
				temp_vector.sub(camera.position); 
				temp_vector.normalize(); 

				t = (-1)*camera.position.y/temp_vector.y; 
				x = camera.position.x + t*temp_vector.x;
				z = camera.position.z + t*temp_vector.z;
				y = 0; 

				this.rightTopBoundary.set(x,y,z); 

				this._computed = true;
			} 
		};
		return {
			getInstance:function(parent){
				if(instance==null){	
					instance = new Screen(parent);
				}
				return instance;
			}
		};
	}
)();