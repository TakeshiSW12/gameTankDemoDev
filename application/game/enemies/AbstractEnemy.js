//package definition
var application = application || {}; 
application.game = application.game || {};
application.game.enemies = application.game.enemies || {};
//--- end -- package definition--------------
application.game.enemies.AbstractEnemy = function(mesh,direction,position){ 
	this._mesh = mesh;
	this._position = position;
	if(this._mesh)this._mesh.position.copy(position);
	this._direction = !direction ? new THREE.Vector2(1.0,0.0) : direction;
	this._life = 0;
};
application.game.enemies.AbstractEnemy.prototype = {
	setDirection:function(direction){
		this._direction = direction;
	},
	getDirection:function(){
		return this._direction;
	},
	setPosition:function(position){
		this._position = position.clone();
		this._mesh.position.copy(this._position);
	},
	getPosition:function(){
		return this._position;
	},
	getMesh:function(){
		return this._mesh;
	},
	getLife:function(){
		return this._life;
	},
	setLife:function(life){
		this._life = life;
	},
	destroy:function(){
		throw new Exception("implementar destroy");
	},
	animateDestroy:function(){
		throw new Exception("implementar animateDestroy");
	},
	decrementLife:function(){
		throw new Exception("implementar decrementLife");
	}
}; 