//package definition
var application = application || {}; 
application.controller = application.controller || {};
application.controller.touches = application.controller.touches || {};
//--- end -- package definition--------------
application.controller.touches.TouchMove = function(parent){
	this._parent = parent//application.controller.touches.TouchHandler
	this._fromPoint = new THREE.Vector2();//THREE.Vector2
	this._toPoint = new THREE.Vector2();//THREE.Vector2
	this._touchID = null;//window.Touch.identifier
	this._tempVector2 = new THREE.Vector2(0,0);
};
application.controller.touches.TouchMove.prototype = Object.create(application.controller.touches.ITouchable.prototype);
application.controller.touches.TouchMove.prototype.constructor = application.controller.touches.TouchMove;
 
application.controller.touches.TouchMove.prototype.setFromPoint = function(v2){
	this._fromPoint = v2;
};
application.controller.touches.TouchMove.prototype.setToPoint = function(v2){
	this._toPoint = v2;
};
application.controller.touches.TouchMove.prototype.setTouchID = function(touchID){
	this._touchID = touchID;
};
application.controller.touches.TouchMove.prototype.getTouchID = function(){
	return this._touchID;
};
application.controller.touches.TouchMove.prototype.getFromPoint = function(){
	return this._fromPoint;
};
application.controller.touches.TouchMove.prototype.getToPoint = function(){
	return this._toPoint;
};
application.controller.touches.TouchMove.prototype.restorePoints = function(windowWidth,windowHeight){
	var length = 0;
	var m = windowWidth>windowHeight ? windowHeight/4:windowWidth/4; 
	if(this._fromPoint && this._toPoint){ 
		this._tempVector2.x = this._toPoint.x - this._fromPoint.x;
		this._tempVector2.y = this._toPoint.y - this._fromPoint.y;  
		length = Math.sqrt(
			Math.pow(this._tempVector2.x,2)+
			Math.pow(this._tempVector2.y,2)
		); 
		if(length>0){
			if(length>m){
				this._tempVector2.x /=length;
				this._tempVector2.y /=length;
				this._tempVector2.x *= m;
				this._tempVector2.y *= m;  

				this._toPoint.x = this._fromPoint.x + this._tempVector2.x;
				this._toPoint.y = this._fromPoint.y + this._tempVector2.y; 
					
			}
		} 
	} 
};

application.controller.touches.TouchMove.prototype.draw = function(ctx,windowWidth,windowHeight){  
	if(this._touchID===null){  
		return;
	}  
	this.restorePoints(windowWidth,windowHeight);
	var m = windowWidth>windowHeight ? windowHeight/4:windowWidth/4;
	var x,y;
	x = this._fromPoint.x;
	y = this._fromPoint.y;
	var radius = windowWidth/32;
	if(radius<25)radius=25;
	if(radius>70)radius=70;
	if(m<radius+50)m=radius+50;
	if(m>radius+100)m=radius+100; 
	//----------------------------------
	ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
	ctx.lineWidth=3;
	ctx.beginPath();
	ctx.arc(x,y,m,0,2*Math.PI);
	ctx.stroke(); 
	//----------------------------------
	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);
	ctx.fill();
	x = this._toPoint.x;
	y = this._toPoint.y;
	//----------------------------------
	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);
	ctx.fill();
	//---------------------------------- 
};