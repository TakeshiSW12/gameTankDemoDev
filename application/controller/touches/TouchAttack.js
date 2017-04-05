//package definition
var application = application || {}; 
application.controller = application.controller || {};
application.controller.touches = application.controller.touches || {};
//--- end -- package definition--------------
application.controller.touches.TouchAttack = function(parent){
	this._parent = parent//application.controller.touches.TouchHandler
	this._center = null;//THREE.Vector2 
	this._radius = 0;

	this._canAttack = false;
}; 
application.controller.touches.TouchAttack.prototype = Object.create(application.controller.touches.ITouchable.prototype);
application.controller.touches.TouchAttack.prototype.constructor = application.controller.touches.TouchAttack;
  
application.controller.touches.TouchAttack.prototype.setCenter = function(center){
	this._center = center;
};
application.controller.touches.TouchAttack.prototype.getCenter = function(){
	return this._center;
}; 
application.controller.touches.TouchAttack.prototype.setRadius = function(radius){
	this._radius = radius;
};
application.controller.touches.TouchAttack.prototype.getRadius = function(){
	return this._radius;
}; 
application.controller.touches.TouchAttack.prototype.canAttack = function(){
	return this._canAttack;
}; 
application.controller.touches.TouchAttack.prototype.setCanAttack = function(attack){
	this._canAttack = attack;
}; 
application.controller.touches.TouchAttack.prototype.restorePoints = function(windowWidth,windowHeight){ 
	if(!this._center)this._center = new THREE.Vector2();
	this._center.x = windowWidth/2;
	this._center.y = windowHeight - this._radius - 20;
};

application.controller.touches.TouchAttack.prototype.draw = function(ctx,windowWidth,windowHeight){   
	var radius = windowWidth/32;
	if(radius<25)radius=25;
	if(radius>70)radius=70; 
	this._radius = radius; 
	this.restorePoints(windowWidth,windowHeight); 
	if(this._radius===0)return;
	//----------------------------------
	if(this._canAttack){
		ctx.fillStyle = "rgba(0, 255,0, 0.5)";
	}else{
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	}
	
	ctx.beginPath();
	ctx.arc(this._center.x,this._center.y,radius,0,2*Math.PI);
	ctx.fill();  
};