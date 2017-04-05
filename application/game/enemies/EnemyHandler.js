//package definition
var application = application || {}; 
application.game = application.game || {};
application.game.enemies = application.game.enemies || {};
//--- end -- package definition--------------
application.game.enemies.EnemyHandler = (
	function(){

		var instance 		= null;

		var _parent 		= null;
		var _tank 			= null;
		var _positions 		= null;
		var _types 			= null;
		var _enemy1Loaded 	= null;
		var _enemy2Loaded 	= null;
		var _enemies 		= null;
		var _missiles 		= null;
		var _fileManager 	= null;
		var _screenUtil 	= null;
		var _intervalAttack = null;

		EnemyHandler = function(parent){
			_parent 		= parent;//application.game.Components
			_tank 			= null;
			_positions 		= [];
			_types     		= [];

			_enemy1Loaded 	= false;  
			_enemy2Loaded 	= false;  

			_enemies 		= [];
			_missiles 		= [];
			_fileManager 	= application.files.FileManager.getInstance();
			_screenUtil 	= application.game.utilities.Screen.getInstance();

			_intervalAttack = EnemyHandler.intervalAttack;

		};
		EnemyHandler.prototype = {
			getParent:function(){
				return _parent;
			},
			isLoaded:function(){
				return _enemy1Loaded && _enemy2Loaded;
			},
			countAllKilled:function(){
				var enemie;
				var index;

				var _count = 0;
				for(index in _enemies){
					enemie = _enemies[index];
					if(enemie && !enemie.isVisible()){
						_count++;
					}
				}
				return _count;
			},
			isAllKilled:function(){
				return this.countAllKilled() == _enemies.length && _enemies.length>0;
			},
			countAllDamage:function(){
				var enemie;
				var index;

				var _countLife = 0;
				for(index in _enemies){
					enemie = _enemies[index]; 
					if(enemie){
						_countLife += enemie.getLife(); 
					}
				}
				return _countLife;
			},
			reset:function(){
				_positions 		= [];
				_types     		= [];

				_enemy1Loaded 	= false;  
				_enemy2Loaded 	= false;  
 
				for(var indexM=0;indexM<_missiles.length;indexM++){
					_missiles[indexM].setVisible(false);
				} 


				var enemy = null;
				for(var index=0;index<_enemies.length;index++){
					enemy = _enemies[index];
					this.getParent().getParent().getScene().remove(enemy.getMesh());
					_enemies[index] = null;
				}
				_enemies = [];

				this.load();
			},
			load:function(){ 

				this.setupPositions();
				var jsonLoader = new THREE.JSONLoader();
				var textureLoader = new THREE.TextureLoader();


				var _this = this;
				jsonLoader.load(_fileManager.getById("enemy1")[0].getURL(),
						function(geometry,materials){
							for(var i in materials){
								//materials[i].shading = THREE.FlatShading;
							}
							var mesh = new THREE.Mesh(geometry,new THREE.MeshFaceMaterial(materials)); 
							
							for(var index=0;index<_positions.length;index+=2){
								var type = _types[index/2];
								if(type==0){
									mesh = mesh.clone();
									var tankEnemy = new application.game.enemies.TankEnemy(
										mesh,
										new THREE.Vector2(),
										new THREE.Vector3(
												_positions[index],
												4,
												_positions[index+1]
											),
										3.5,
										0,
										_this);	
									console.log("add enemy type 0");
									_this.getParent().getParent().getScene().add(mesh);
									_enemies.push(tankEnemy);
								} 
							} 
							_enemy1Loaded = true;  
						}
					);
				jsonLoader.load(_fileManager.getById("enemy2")[0].getURL(),
						function(geometry,materials){
							for(var i in materials){
								//materials[i].shading = THREE.FlatShading;
							}
							var mesh = new THREE.Mesh(geometry,new THREE.MeshFaceMaterial(materials)); 
							
							for(var index=0;index<_positions.length;index+=2){
								var type = _types[index/2];
								if(type==1){
									mesh = mesh.clone();
									var tankEnemy = new application.game.enemies.TankEnemy(
										mesh,
										new THREE.Vector2(),
										new THREE.Vector3(
												_positions[index],
												4,
												_positions[index+1]
											),
										3.5,
										1,
										_this);	
									console.log("add enemy type 1");
									_this.getParent().getParent().getScene().add(mesh);
									_enemies.push(tankEnemy);
								} 
							} 
							_enemy2Loaded = true;  
						}
					);

			},
			setupPositions:function(){ 

				//x,y
				_positions.push(-79.94688,80.34463);
				_types.push(0);
				_positions.push(-31.42191,79.94688);
				_types.push(0);
				_positions.push(1.32688,96.66499);
				_types.push(1); 
				_positions.push(30.22867,79.15139);
				_types.push(0);
				_positions.push(67.61677,79.15139);
				_types.push(0);
				_positions.push(95.48764,93.22847);
				_types.push(0);
				_positions.push(-90.68602,40.17231);
				_types.push(0);
				_positions.push(-57.67313,50.91145);
				_types.push(0);
				_positions.push(-1.58098,47.72948);
				_types.push(0);
				_positions.push(54.09341,50.5137);
				_types.push(1);
				_positions.push(89.89053,38.58133);
				_types.push(0);
				_positions.push(-54.88891,17.50081);
				_types.push(1);
				_positions.push(-11.93238,13.9211);
				_types.push(0);
				_positions.push(26.25121,21.47827);
				_types.push(0); 
				_positions.push(66.82127,7.95491);
				_types.push(0);
				_positions.push(-87.10631,-5.1707);
				_types.push(0);
				_positions.push(-49.30455,-24.64433);
				_types.push(0);
				_positions.push(-3.48424,-38.39042);
				_types.push(1);
				_positions.push(40.61781,-55.57304);
				_types.push(0);
				_positions.push(74.41029,-40.68143);
				_types.push(1);
				_positions.push(-89.39732,-44.11796);
				_types.push(0);
				_positions.push(-52.16832,-65.30986);
				_types.push(0);
				_positions.push(6.25258,-75.04667);
				_types.push(0);
				_positions.push(-85.38805,-93.37479);
				_types.push(1);
				_positions.push(-28.68541,-94.5203);
				_types.push(0);
				_positions.push(42.33607,-95.66581);
				_types.push(1);
				_positions.push(79.56508,-81.91972);
				_types.push(0);
			},
			setTank:function(tank){
				_tank = tank;
			},
			render:function(){
				var enemy = null;
				this.attack();
				if(_tank){
					for(var index=0;index<_enemies.length;index++){
						enemy = _enemies[index]; 
						enemy.lookAt(_tank.getPosition());
					} 
				}
				this.applyCollision_tankMissiles_enemies();
				this.animateMissiles();
				this.applyCollision_enemiesMissiles_tank();
				
			},
			attack:function(){
				--_intervalAttack;
				if(_intervalAttack<=0){
					_intervalAttack = EnemyHandler.intervalAttack;
				}else{
					return;
				}

				if(_enemies && _tank){
					var enemyPosition = null;
					var enemy = null;
					var missil = null;
					var tankPosition = _tank.getPosition();
					var findMissil = false;
					for(var index = 0; index<_enemies.length;index++){
						enemy = _enemies[index];
						if(_screenUtil.isOutScreen(enemy) || !enemy.isVisible()){
							continue;
						}
						enemyPosition = enemy.getPosition();
						findMissil = false;
						for(var indexM=0;indexM<_missiles.length;indexM++){
							missil = _missiles[indexM];
							if(missil.isActive() && !missil.isVisible()){
								findMissil = true;
								missil.setPosition(enemyPosition.clone());
								missil.lookAt(tankPosition.clone()); 
								missil.setVisible(true);
								break;
							}
						}
						if(findMissil===false){
							var mesh = application.game.movil.missiles.Missil.getDefaultMeshEnemy();
							if(mesh){
								this.getParent().getParent().getScene().add(mesh);
								missil = 
									new application.game.movil.missiles.Missil(
										mesh,
										this
									);
								missil.setPosition(enemyPosition.clone());
								missil.lookAt(tankPosition.clone()); 
								missil.setVisible(true);
								_missiles.push(missil); 
							}else{
								console.log("no mesh missil enemy");
							}
						}
					}
					if(missil){
						console.log("missil enemy created.");
					}
				} 
			},
			animateMissiles:function(){
				var missil = null;
				var _pos = null;
				for(var i=0;i<_missiles.length;i++){
					missil = _missiles[i];
					if(missil.isActive() && missil.isVisible()){
						missil.move(application.game.movil.missiles.Missil.defaultMovement-0.3); 
						_pos = missil.getPosition();
						if(
							_pos.x< -_screenUtil.getPlatformHalfWidth() || 
							_pos.x> _screenUtil.getPlatformHalfWidth() || 
							_pos.z> _screenUtil.getPlatformHalfHeight() || 
							_pos.z< -_screenUtil.getPlatformHalfHeight()   
						){
							missil.setVisible(false); 
							console.log("missil enemy hide");
						}
					}
				} 
			},
			applyCollision_enemiesMissiles_tank:function(){
				if(_missiles && _tank){
					var missil = null;
					var missilPosition = null;
					var tankPosition = _tank.getPosition();
					for(var indexM=0;indexM<_missiles.length;indexM++){
						missil = _missiles[indexM];
						if(missil.isActive() && missil.isVisible() ){
							missilPosition = missil.getPosition();
							var distance = tankPosition.distanceTo(missilPosition)+2;
							if( distance<= ( _tank.getRadius() + missil.getRadius() ) ){
								_tank.decrementLife();
								missil.setVisible(false);
							}
						}
					}
				}
			},
			applyCollision_tankMissiles_enemies:function(){
				if(_tank && _enemies){
					//tank´s missiles and _enemies
					var missiles = _tank.getMissiles();
					var missil=null; 
					var missilPosition = null;
					var enemyPosition = null;
					var enemy = null;
					var killed = 0;
					for(var indexM=0;indexM<missiles.length;indexM++){
						missil = missiles[indexM];
						if(missil.isActive() && missil.isVisible()){
							missilPosition = missil.getPosition(); 
							for(var indexE=0;indexE<_enemies.length;indexE++){
								enemy = _enemies[indexE];
								if(enemy.isActive() && enemy.isVisible() ){
									enemyPosition = enemy.getPosition();
									var distance = missilPosition.distanceTo(enemyPosition)+2;
									if(distance <= (missil.getRadius() + enemy.getRadius() )){
										missil.setVisible(false);
										killed = enemy.decrementLife();
										if(killed===1){
											
										}
										console.log("collision");
									}
								}
							}
						} 
					}
				}
			}
		};
		EnemyHandler.intervalAttack = 40;
		return {
			getInstance:function(parent){
				if(!instance){
					instance = new EnemyHandler(parent);
				}
				return instance;
			}
		};
	}
)();