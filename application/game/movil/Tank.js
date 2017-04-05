//package definition
var application = application || {}; 
application.game = application.game || {};
application.game.movil = application.game.movil || {};
//--- end -- package definition--------------

application.game.movil.Tank = (
	function(){
		var instance = null;
		var _parent = null;
		var _mesh = null;
		var _position = null; 
		var _currentLookAtVector = null;
		var _screenUtil = null;
		var _intervalAttack = null;
		var _direction = null;
		var _units = 0;

		var _life = 0;

		var _dir = null; 
		Tank = function(mesh,parent){
			_mesh = mesh; 
			_position = mesh.position.clone();
			_parent = parent;//application.game.Components
			_missiles = [];
			_screenUtil = this.getParent().getParent().getScreenUtil();

			_intervalAttack = Tank.intervalAttack;
			_radius =4;

			_life = Tank.defaultLife;

		};
		Tank.prototype = { 
			getLife:function(){
				return _life;
			},
			resetLife:function(){
				_life = Tank.defaultLife;
				if(window._life){
					window._life.style.width= _life+"%";
				}
			},
			getRadius:function(){
				return _radius;
			},
			decrementLife:function(){
				_life -=3;
				if(_life<0){
					_life = 0;
				}
				if(window._life){
					window._life.style.width= _life+"%";
				}
			},
			getParent:function(){
				return _parent;
			},
			resetPosition:function(){ 
				this.setPosition(new THREE.Vector3(0,0,0));
			},
			setPosition:function(position){
				if(position){
					position.y 	= Tank.defaultPosY;
					_position 	= position.clone();
					_mesh.position.copy(_position); 
				}
			},
			getPosition:function(){
				return _position;
			}, 
			getLookAt:function(){
				return _currentLookAtVector;
			},
			getDirection : function(){ 
				return _direction;
			},
			getUnits:function(){
				return _units;
			},
			lookAt:function(vector){ 
				if(vector!=null && vector instanceof THREE.Vector3){
					vector.y = Tank.defaultPosY;
					/*
					if(_currentLookAtVector!=null){
						var temp = _currentLookAtVector.clone();
						temp.sub(vector);
						if(temp.length()<0.01){
							return;
						}
					}
					*/
					if(   
						(
							_mesh.position.x != vector.x || 
							_mesh.position.y != vector.y ||  
							_mesh.position.z != vector.z 
						)
					){  
						if(!_currentLookAtVector){
							_currentLookAtVector = new THREE.Vector3();
						}
						_currentLookAtVector.copy(vector); 
						var temp_dir = vector.clone();
						_mesh.lookAt(vector);
						temp_dir.sub(_mesh.position);
						temp_dir.normalize();
						if(!_dir){
							_dir = new THREE.Vector3();
						}
						_dir.copy(temp_dir);  
					}
				} 
			},
			applyKeyEvent:function(keyEvent){
					var front 	= 0;
				if(_currentLookAtVector && keyEvent){
					var left 	= 0;
					if(keyEvent.key_W){
						front ++;
					}
					if(keyEvent.key_S){
						front --;
					}
					if(keyEvent.key_A){
						left --;
					}
					if(keyEvent.key_D){
						left ++;
					}
					return this.goTo(front);  
				} 
				if(front===0)return false;
				return true;
				
			},
			goTo:function(front){ 
				if(front===0 || front===null || front===undefined)return false;
				if(!_dir || !_mesh)return false;   
				var vectorFront = _dir.clone();
				if(!_direction)_direction = new THREE.Vector3();
				_direction.copy(vectorFront);
				_units = front * 0.45;
				vectorFront.multiplyScalar(_units); 

				var temp_position = _position.clone();
				temp_position.add(vectorFront);

				var pHW = _screenUtil.getPlatformHalfWidth();
				var pHH = _screenUtil.getPlatformHalfHeight();

				if(
					temp_position.x<= -pHW || 
					temp_position.x>= pHW || 
					temp_position.z<= -pHH || 
					temp_position.z>= pHH 
				){ 
					return false;
				}
				_position.add(vectorFront);  
				_mesh.position.copy(_position);  
				return true;

			},
			/*
			goTo:function(front){
				if(front===0 || front===null || front===undefined)return false;
				if(!_currentLookAtVector || !_mesh)return false; 
				var vectorFront = _currentLookAtVector.clone(); 
				vectorFront.sub(_position);
				console.log("length[vectorFront="+application.utilities.Util.Vector3String(vectorFront)+"]="+vectorFront.length());
				vectorFront.normalize();
				vectorFront.y=0;
				if(!_direction)_direction = new THREE.Vector3();
				_direction.x = vectorFront.x;
				_direction.y = -vectorFront.z;
				_direction.z = 0;
				_units = front * 0.35;
				vectorFront.multiplyScalar(_units); 

				var temp_position = _position.clone();
				temp_position.add(vectorFront);

				var pHW = _screenUtil.getPlatformHalfWidth();
				var pHH = _screenUtil.getPlatformHalfHeight();

				if(
					temp_position.x<= -pHW || 
					temp_position.x>= pHW || 
					temp_position.z<= -pHH || 
					temp_position.z>= pHH 
				){
					return false;
				}

				_position.add(vectorFront); 
				_currentLookAtVector.add(vectorFront);
				_mesh.position.copy(_position);
				this.lookAt(_currentLookAtVector);
				return true;

			},
			*/
			getMissiles:function(){
				return _missiles;
			},
			attack:function(){

				--_intervalAttack;
				if(_intervalAttack<=0){
					_intervalAttack = Tank.intervalAttack;
				}else{
					return;
				}


				var _position = this.getPosition();
				var _lookAt   = this.getLookAt();

				var find = false;
				if(_position && _lookAt){
					if(_missiles.length>0){
						var missil = null;
						for(var i=0;i<_missiles.length;i++){
							missil = _missiles[i];
							if(missil.isActive() && !missil.isVisible()){
								find = true;
								missil.setPosition(_position.clone());
								missil.lookAt(_lookAt.clone()); 
								missil.setVisible(true);
								break;
							}
						}
					}
					if(!find){ 
						var mesh = application.game.movil.missiles.Missil.getDefaultMesh();
						if(mesh){
							this.getParent().getParent().getScene().add(mesh);
							missil = 
								new application.game.movil.missiles.Missil(
									mesh,
									this
								);
							missil.setPosition(_position.clone());
							missil.lookAt(_lookAt.clone()); 
							missil.setVisible(true);
							_missiles.push(missil); 
						} 
					}	
				}
				
			},
			animateMissiles:function(){
				var missil = null;
				var _pos = null;
				for(var i=0;i<_missiles.length;i++){
					missil = _missiles[i];
					if(missil.isActive() && missil.isVisible()){
						missil.move(application.game.movil.missiles.Missil.defaultMovement-0.1); 
						_pos = missil.getPosition();
						if(
							_pos.x< _screenUtil.leftTopBoundary.x || 
							_pos.x> _screenUtil.rightTopBoundary.x || 
							_pos.z> _screenUtil.leftBottomBoundary.z || 
							_pos.z< _screenUtil.leftTopBoundary.z   
						){
							missil.setVisible(false); 
						}
					}
				} 
			} 
		};
		Tank.defaultPosY = 3;
		Tank.intervalAttack = 10;
		Tank.defaultLife = 100;
		return {
			getInstance:function(mesh,parent){
				if(instance==null){	
					instance = new Tank(mesh,parent);
				}
				return instance;
			}
		};
	}
)();
