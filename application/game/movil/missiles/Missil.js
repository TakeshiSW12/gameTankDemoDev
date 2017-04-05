//package definition
var application = application || {}; 
application.game = application.game || {};
application.game.movil = application.game.movil || {};
application.game.movil.missiles = application.game.movil.missiles || {};
//--- end -- package definition--------------
application.game.movil.missiles.Missil = function(mesh,parent){
	this._mesh = mesh;
	this._parent = parent;
	this._position = null;
	this._lookAt = null;
	this._direction = null;
	this._radius = application.game.movil.missiles.Missil.defaultRadius;
	this._active = true;
	this.setVisible(false);
};
application.game.movil.missiles.Missil.prototype = {
	constructor:application.game.movil.missiles.Missil,
	getParent:function(){
		return this._parent;
	},
	isActive:function(){
		return this._active;
	},
	setActive:function(active){
		this._active = active;
	},
	isVisible:function(){
		return this._mesh.visible;
	},
	setVisible:function(visible){
		this._visible = visible;
		if(this._mesh){
			this._mesh.visible = visible;
		} 
	},
	getMesh:function(){
		return this._mesh;
	},
	setPosition:function(position){
		if(position){
			this._position = position; 
			this._mesh.position.x = this._position.x; 
			this._mesh.position.y = this._position.y; 
			this._mesh.position.z = this._position.z; 	
		}
		
	},
	getPosition:function(){
		return this._position;
	},
	setRadius:function(radius){
		this._radius = radius;
	},
	getRadius:function(){
		return this._radius;
	},
	lookAt:function(_lookAt){
		if(this._position && _lookAt){
			this._lookAt = _lookAt;
			this._mesh.lookAt(_lookAt);
			var temp_direction = this._lookAt.clone();
			temp_direction.sub(this._position);
			temp_direction.normalize();
			this._direction = temp_direction;
		}
	},
	move:function(distance){
		if(this._direction && this._position && this.isVisible() && this.isActive()){
			var temp_dirX = this._direction.x * distance; 
			var temp_dirZ = this._direction.z * distance; 
			this._position.x += temp_dirX;
			//this._position.y += this._direction.y + distance;
			this._position.z += temp_dirZ;
			this._position.y=3; 
			//---------------------------------------------------- 
			this._mesh.position.x = this._position.x; 
			this._mesh.position.y = this._position.y; 
			this._mesh.position.z = this._position.z; 
		}
	}
};
application.game.movil.missiles.Missil.defaultMesh = null;
application.game.movil.missiles.Missil.defaultRadius = 3;
application.game.movil.missiles.Missil.defaultMovement = 1.1; 
application.game.movil.missiles.Missil.defaultTexture = null;
application.game.movil.missiles.Missil.defaultMaterial = null; 
application.game.movil.missiles.Missil.getDefaultMaterial = function(){
	if(application.game.movil.missiles.Missil.defaultTexture){
		if(application.game.movil.missiles.Missil.defaultMaterial===null){
			application.game.movil.missiles.Missil.defaultMaterial = new THREE.SpriteMaterial({map:application.game.movil.missiles.Missil.defaultTexture,transparent:true,alphaTest:0.5});
		}
		return application.game.movil.missiles.Missil.defaultMaterial;
	}
	return null;
};
application.game.movil.missiles.Missil.getDefaultMesh = function(){ 
	/*
	var material = application.game.movil.missiles.Missil.getDefaultMaterial();
	if(material){
		var sprite = new THREE.Sprite( material );
		sprite.scale.set(10,10,10);
		return sprite;
	}
	return null;
	*/
	if(application.game.movil.missiles.Missil.defaultMesh){
		return application.game.movil.missiles.Missil.defaultMesh.clone();
	}
	return null;
};


application.game.movil.missiles.Missil.defaultMeshEnemy = null;
application.game.movil.missiles.Missil.getDefaultMeshEnemy = function(){  
	if(application.game.movil.missiles.Missil.defaultMeshEnemy){
		return application.game.movil.missiles.Missil.defaultMeshEnemy.clone();
	}
	return null;
};