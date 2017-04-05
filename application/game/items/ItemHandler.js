//package definition
var application = application || {}; 
application.game = application.game || {};
application.game.items = application.game.items || {};
//--- end -- package definition--------------
application.game.items.ItemHandler = (
	function(){

		var instance 		= null; 
		var _parent 		= null;

		var _items = [];

		var _tank = null;
		var _fileManager 	= null;
		var _screenUtil 	= null;


		var _positions = [];
		var _positionUp = 2;

		var _counter = 0;

		var _loaded = false;
		ItemHandler = function(parent){
			_parent = parent;
			_fileManager 	= application.files.FileManager.getInstance();
			_screenUtil 	= application.game.utilities.Screen.getInstance();

			this.setPositions();
		};
		ItemHandler.prototype = {
			setPositions:function(){
				_positions = [];
				_positions.push(95,0);
				_positions.push(-95,0);
				_positions.push(0,95);
				_positions.push(0,-95);
			},
			getParent:function(){
				return _parent;
			},
			getItems:function(){
				return _items;
			},
			getCounter:function(){
				return _counter;
			},
			setTank:function(tank){
				_tank = tank;
			},
			isLoaded:function(){
				return _loaded;
			},
			isAllCaptured:function(){
				var count = this.countAllCaptured();
				return count==_items.length && _items.length>0;
			},
			countAllCaptured:function(){
				var item = null;
				var _count = 0;
				for(var i in _items){
					item = _items[i];
					if(item && !item.isVisible()){
						_count++;
					}
				}
				return _count;
			},
			load:function(){
				var jsonLoader = new THREE.JSONLoader();
				var textureLoader = new THREE.TextureLoader();
				var _this = this;
				var scene = _this.getParent().getParent().getScene();
				jsonLoader.load(_fileManager.getById("itemA")[0].getURL(),
						function(geometry,materials){
							for(var i in materials){
								//materials[i].shading = THREE.FlatShading;
							}
							var mesh = new THREE.Mesh(geometry,new THREE.MeshFaceMaterial(materials)); 
							_enemy1Loaded = true;  
							for(var index=0;index<_positions.length;index+=2){  
								var item = new application.game.items.Item(
									_this,
									mesh,
									new THREE.Vector3(_positions[index],_positionUp,_positions[index+1])
								);	 
								scene.add(mesh);
								_items.push(item); 
								mesh = mesh.clone(); 
							} 
							_loaded = true;
						}
					);
			},
			reset:function(){
				_counter = 0; 
				for(var i in _items){
					item = _items[i];
					item.setVisible(true);
				}
			},
			render:function(){
				this.applyCollision();
			},
			applyCollision:function(){
				if(_tank){
					var item = null;
					var _distance = 0;
					var _tankPosition = _tank.getPosition();
					for(var i in _items){
						item = _items[i];
						if(item.isVisible()){
							_distance = _tankPosition.distanceTo(item.getPosition());
							if(_distance<6.5){
								item.setVisible(false);
								_counter++;
							}
						}
					}
				}
			}
		};

		return {
			getInstance:function(parent){
				if(instance==null){
					instance = new ItemHandler(parent);
				}
				return instance;
			}
		};
	}
)();