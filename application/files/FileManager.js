//package definition
var application = application || {}; 
application.files = application.files || {};
//--- end -- package definition--------------
application.files.FileManager = (
	function(){
		var instance = null;
		//private fields-----
		var _lists = null; 
		//---end private fields---
		FileManager = function(){ 
			_lists = [];
			this._loaded = false; 
			this.prepare();
		};
		FileManager.prototype={
			constructor:application.files.FileManager, 
			isLoaded:function(){
				return this._loaded;
			},
			setLoaded:function(loaded){
				this._loaded = loaded;
			},
			prepare:function(){
				
				_lists.push(
					new application.files.File("Plane floor","./files/json/plane.json","plane_floor","json") , 
					new application.files.File("tank mobile","./files/json/tank1.json","tank","json") , 
					new application.files.File("missil 1","./files/json/missil.json","missil1","json") ,   
					new application.files.File("missil 2","./files/json/missil2.json","missil2","json") ,   
					new application.files.File("tank enemy1","./files/json/enemy1.json","enemy1","json"),    
					new application.files.File("tank enemy2","./files/json/enemy2.json","enemy2","json"),    
					new application.files.File("itemA","./files/json/itemA.json","itemA","json")    
				);
				
			},  
			getLists:function(){
				return _lists;
			},
			setLists:function(l){
				_lists = l;
			},
			loadFiles:function(){
				if(_lists.length>0){
					console.log("files loading...");
					var obj = null;
					for(var i in _lists){
						obj = _lists[i];
						application.connection.Socket.loadFile(obj.getURL(),obj);
					}
				}
			},
			getById:function(id){
				var obj = null, i ;
				var list = [];
				for(i in _lists){
					obj = _lists[i];
					if(obj.getID()==id){
						list.push(obj); 
					}
				} 
				if(list.length==0){
					return null;
				}
				return list;
			}
		};

		return {
			getInstance:function(){
				if(!instance){
					instance = new FileManager();
				}
				return instance;
			}						
		};
	}
)();