//package definition
var application = application || {}; 
application.game = application.game || {};
application.game.enemies = application.game.enemies || {};
//--- end -- package definition--------------
application.game.enemies.TankEnemy = function(mesh,direction,position,radius,type,parent){ 
	application.game.enemies.AbstractEnemy.apply(this,arguments);
	this._parent = parent;//application.game.Components
	this._radius = radius;
	this._life = application.game.enemies.TankEnemy.defaultLife;
	this._active = true; 
	this._explosion = null;//planebufferGeometry and shaderMaterial THREE.
	this._type = typeof type=="number" ? type : 0;
	

};
application.game.enemies.TankEnemy.prototype = Object.create(application.game.enemies.AbstractEnemy.prototype);
application.game.enemies.TankEnemy.prototype.constructor = application.game.enemies.TankEnemy;
application.game.enemies.TankEnemy.prototype.getParent = function(){
	return this._parent;
};
application.game.enemies.TankEnemy.prototype.getRadius = function(){
	return this._radius;
};
application.game.enemies.TankEnemy.prototype.getLife = function(){
	return this._life;
};
application.game.enemies.TankEnemy.prototype.resetLife = function(){
	this._life = application.game.enemies.TankEnemy.defaultLife;
};
application.game.enemies.TankEnemy.prototype.isActive = function(){
	return this._active;
};
application.game.enemies.TankEnemy.prototype.isVisible = function(){
	return this._mesh && this._mesh.visible;
};
application.game.enemies.TankEnemy.prototype.getExplosion = function(){
	return this._explosion;
};
application.game.enemies.TankEnemy.prototype.setExplosion = function(e){
	this._explosion = e;
};
application.game.enemies.TankEnemy.prototype.getType = function(){
	return this._type;
};
application.game.enemies.TankEnemy.prototype.setType = function(t){
	this._type = t;
};
application.game.enemies.TankEnemy.prototype.decrementLife = function(){
	--this._life;
	if(this._life<=0){
		this._life = application.game.enemies.TankEnemy.maxLife;
		this.destroy();
		return 1;//was killed;
	}
	return 0;
};
application.game.enemies.TankEnemy.prototype.lookAt = function(lookAt){
	if(this._mesh)this._mesh.lookAt(lookAt);
};
application.game.enemies.TankEnemy.prototype.destroy = function(){
	this._mesh.visible = false;
	this._active = false; 
	this.animateDestroy();
};
application.game.enemies.TankEnemy.prototype.animateDestroy = function(){
	if(this._explosion){ 
		this._explosion.visible = true;
		this._explosion.position.x = this._mesh.position.x;
		this.explosion.position.y = this._mesh.position.y; 
		var uniforms = this._explosion.material.uniforms; 
		if(uniforms.scale.value.x<application.game.enemies.TankEnemy.maxScale_on_animateDestroy){ 
			uniforms.scale.value.x +=0.1;
			uniforms.scale.value.y +=0.1; 
			this._explosion.position.z -= uniforms.scale.value.x/5;
		}else{
			this._active = true;
			this._explosion.visible = false;
			uniforms.scale.value.x = uniforms.scale.value.y = 1;
			this._explosion.position.z = 0;
			 
		}
	}else{
		this._active = true;
	}
};

//static fields
application.game.enemies.TankEnemy.interval = application.game.enemies.TankEnemy.def_interval = 200;   
application.game.enemies.TankEnemy.maxScale_on_animateDestroy = 4; 
application.game.enemies.TankEnemy.maxLife = 2; 
application.game.enemies.TankEnemy.defaultLife = 2; 
application.game.enemies.TankEnemy.rotationX = 0.5*Math.PI/180; 
application.game.enemies.TankEnemy.inc_rotationX = 0.1*Math.PI/180;  