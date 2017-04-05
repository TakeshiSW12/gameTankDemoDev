//package definition
var application = application || {}; 
application.controller = application.controller || {};  
application.controller.mouse = application.controller.mouse || {};  
//--- end -- package definition--------------

application.controller.mouse.MouseMove = (
	function(){
		var instance = null; 
		MouseMove = function(){ 
			this._position3D = null;//THREE.Vector3

			this._clientX = null;
			this._clientY = null;

			this._appWidth 	= null;
			this._appHeight = null;
		};
		MouseMove.prototype = {
			constructor:application.controller.mouse.MouseMove,
			setClientX:function(clientX){
				this._clientX = clientX;
			},
			setClientY:function(clientY){
				this._clientY = clientY;
			},
			setAppWidth:function(width){
				this._appWidth = width;
			},
			setAppHeight:function(height){
				this._appHeight = height;
			},
			setPositionFrom:function(obj){
				if(!this._position3D){
					var pos = this.getProjectPositionOn(obj); 
					this._position3D = pos;
				}
			},
			setPosition3D:function(position){
				this._position3D = position;
			},
			getPosition3D:function(){
				return this._position3D;
			},
			getProjectPositionOn:function(obj){
				if(
					obj instanceof THREE.Camera && 
					this._appWidth!==null && this._appHeight!==null && 
					this._clientX!==null && this._clientY!==null 

				){ 
                    var planeZ = new THREE.Plane(new THREE.Vector3(0,1,0), 0);
                    var coords = new THREE.Vector3(
                        (this._clientX / this._appWidth) * 2 - 1,
                        -(this._clientY / this._appHeight) * 2 + 1,
                        0.5 ); 
					coords.unproject(obj); 
					coords.sub(obj.position); 
					coords.normalize(); 

					t = (-1)*obj.position.y/coords.y; 
					x = obj.position.x + t*coords.x;
					z = obj.position.z + t*coords.z;
					y = obj.position.y + t*coords.y; 

 					coords.set(x,y,z); 
                    return coords;
				}
				return null;
			}
		};

		return {
			getInstance:function(){
				if(instance==null){
					instance = new MouseMove();
				}
				return instance;
			}
		};
	}
)();