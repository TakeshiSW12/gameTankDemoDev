//package definition
var application = application || {}; 
application.game = application.game || {};
//--- end -- package definition--------------
application.game.Components = (
	function(){
		var instance = null;
		//private fields----------
		var _parent = null;
		// -- end private fields---
		Components = function(parent){
			_parent = parent;//application.game.Application 
			this._fileManager 	= application.files.FileManager.getInstance();
			this._touchHandler 	= application.controller.touches.TouchHandler.getInstance(null);
			this._keyEvent 		= application.events.KeyEvent.getInstance();
			this._mouseMove 	= application.controller.mouse.MouseMove.getInstance(); 
			this._screenUtil 	= application.game.utilities.Screen.getInstance();
			this._enemyHandler 	= application.game.enemies.EnemyHandler.getInstance(this);

			//game pieces-----
			this._tank = null;
			this._tankCanAttack = false;

			this._lookAtCamera = new THREE.Vector3(0,0,-0.00001);
		};
		Components.prototype = {
			constructor:application.game.Components,
			getParent:function(){
				return _parent;
			},
			load:function(){
				var _this = this;

				var ambientLight = new THREE.AmbientLight( 0xffffff ); // soft white light
				this.getParent().getScene().add( ambientLight ); 

				var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
				directionalLight.castShadow = true; 	  
				directionalLight.position.set( 5,0,50);  
				this.getParent().getScene().add( directionalLight );	

				/*
				var geometry = new THREE.BoxGeometry( 20, 20, 20 );
				var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
				var cube = new THREE.Mesh( geometry, material ); 
				this.parent.getScene().add( cube );
				*/
				/*
				this.getParent().getCamera().position.set(0,120,0);
				*/
				this.getParent().getCamera().aspect = this.getParent().WIDTH / this.getParent().HEIGHT;
				this.getParent().getCamera().updateProjectionMatrix();
				var positionY = this.getParent().WIDTH>=this.getParent().HEIGHT ? this.getParent().getZMin() : this.getParent().getZMax(); 
				this.getParent().getCamera().position.set(0,positionY,0);

				this.getParent().getCamera().lookAt(this._lookAtCamera); 
				this.getParent().getScreenUtil().setComputed(false);
				//this.getParent().getScreenUtil().computeScreenBoundary3D();

				var jsonLoader = new THREE.JSONLoader();
				var textureLoader = new THREE.TextureLoader();

				//load plane floor

				jsonLoader.load(this._fileManager.getById("plane_floor")[0].getURL(),
						function(geometry,materials){
							var mesh = new THREE.Mesh(geometry,new THREE.MeshFaceMaterial(materials)); 
							_this.getParent().getScene().add(mesh);
						}
					); 

				//load tank mobile

				jsonLoader.load(this._fileManager.getById("tank")[0].getURL(),
						function(geometry,materials){
							for(var i in materials){
								//materials[i].shading = THREE.FlatShading;
							}
							var mesh = new THREE.Mesh(geometry,new THREE.MeshFaceMaterial(materials));
							mesh.position.y = 3;
							_this.getParent().getScene().add(mesh);
							_this._tank = application.game.movil.Tank.getInstance(mesh,_this);  
							_this._enemyHandler.setTank(_this._tank);
						}
					); 

				jsonLoader.load(this._fileManager.getById("missil1")[0].getURL(),
						function(geometry,materials){
							for(var i in materials){
								//materials[i].shading = THREE.FlatShading;
							}
							var mesh = new THREE.Mesh(geometry,new THREE.MeshFaceMaterial(materials)); 
							application.game.movil.missiles.Missil.defaultMesh = mesh;
						}
					);

				this._enemyHandler.load();

			},
			whenAppResize:function(){ 

			},
			render:function(time,currentTime){

				if(this._touchHandler && !this._touchHandler.isPaused()){
					this.setupTankProperties();
					if(this._tankCanAttack || this._touchHandler.canAttack()){
						this.initTankAttack();
					}
					this._enemyHandler.render();
				} 
			},
			initTankAttack:function(){
				if(this._tank){
					this._tank.attack(); 
				}
			},
			setTankCanAttack:function(b){
				this._tankCanAttack = b;
			},
			setupTankProperties:function(){
				if(!this._tank)return;

				var keyEventApplied = false;
				var mouseMoveApplied = false;

				//set lookat Tank
				/*
				Mover hacia adelante o hacia atrás.
				*/
				if(
					application && 
					application.events && 
					application.events.KeyEvent && 
					this._tank 
				){
					if(this._keyEvent){
						keyEventApplied = this._tank.applyKeyEvent(this._keyEvent);
						if(keyEventApplied===true){
							this.getParent().getCamera().translateOnAxis(this._tank.getDirectionXZ(),this._tank.getUnits());
							this._screenUtil.computeScreenBoundary3D();
						}
					}
				}
				/*
				Mover orientación del tanque.
				*/
				//var pos = this.getParent().getMouseMovePosition3D();
				var pos = this._mouseMove.getPosition3D();
				if(pos && this._tank && this._tank.getPosition()){
					pos = pos.clone();  
					pos.y = 3; 
					this._tank.lookAt(pos);  
					this._mouseMove.setPosition3D(null);
					mouseMoveApplied = true;
				}
				/*
				Si el dispositivo permite pantalla táctil entonces
				escuchar los eventos de toque.
				*/
				if(application.utilities.Util.isTouch()){
					if(this._touchHandler){
						/*
						Mover orientación del tanque.
						*/
						if(this._touchHandler.canMove() && mouseMoveApplied===false){
							var arrValues =this._touchHandler.getMoveValues();
							if(arrValues){
								var tankPosition = this._tank.getPosition();
								var temp_vector3 = new THREE.Vector3(arrValues[0],0,arrValues[1]);
								temp_vector3.add(tankPosition);
								this._tank.lookAt(temp_vector3);
							}
						}
						/*
						Mover hacia adelante o hacia atrás.
						*/
						if(keyEventApplied===false){
							var _apply =this._tank.goTo(this._touchHandler.getPressedBtnDirection());
							if(_apply===true){ 
								this.getParent().getCamera().translateOnAxis(this._tank.getDirectionXZ(),this._tank.getUnits());
								this._screenUtil.computeScreenBoundary3D();
							}
						} 
					}
				} 
				this._tank.animateMissiles();
				this._tank.applyCollisionMissiles();
				
			}
		};
		return {
			getInstance:function(parent){
				if(!instance){
					instance = new Components(parent);
				}
				return instance;
			}
		};
	}
)();