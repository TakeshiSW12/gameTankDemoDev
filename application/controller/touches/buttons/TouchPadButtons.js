//package definition
var application = application || {}; 
application.controller = application.controller || {};
application.controller.touches = application.controller.touches || {};
application.controller.touches.buttons = application.controller.touches.buttons || {};
//--- end -- package definition--------------
application.controller.touches.buttons.TouchPadButtons = function(parent){
	this._parent = parent//application.controller.touches.TouchHandler
	this._touchID = null;

	this._btnPausePoint = null;//THREE.Vector2
	this._btnPausePointRadius = 0;

	this._lastWindowWidth = 0;

	this._paused = false;

	this._pressedBtnDirection = 0;//-1,0,1;

};
application.controller.touches.buttons.TouchPadButtons.prototype = Object.create(application.controller.touches.ITouchable.prototype);
application.controller.touches.buttons.TouchPadButtons.prototype.constructor = application.controller.touches.buttons.TouchPadButtons;

application.controller.touches.buttons.TouchPadButtons.prototype.setTouchID = function(id){
	this._touchID = id;
};
application.controller.touches.buttons.TouchPadButtons.prototype.getTouchID = function(){
	return this._touchID;
};
application.controller.touches.buttons.TouchPadButtons.prototype.getBtnPausePoint = function(){
	return this._btnPausePoint;
};
application.controller.touches.buttons.TouchPadButtons.prototype.getBtnPausePointRadius = function(){
	return this._btnPausePointRadius;
};
application.controller.touches.buttons.TouchPadButtons.prototype.setPaused = function(paused){
	this._paused = paused;
};
application.controller.touches.buttons.TouchPadButtons.prototype.isPaused = function(){
	return this._paused;
};
application.controller.touches.buttons.TouchPadButtons.prototype.setPressedBtnDirection = function(direction){
	switch(direction){
		case "left":
			this._pressedBtnDirection = -1;
		break;
		case "right":
			this._pressedBtnDirection = 1;
		break;
		default:
			this._pressedBtnDirection = 0;
	}
};
application.controller.touches.buttons.TouchPadButtons.prototype.getPressedBtnDirection = function(){
	return this._pressedBtnDirection;
};

application.controller.touches.buttons.TouchPadButtons.prototype.restorePoints = function(windowWidth,windowHeight){
	
	this._lastWindowWidth = windowWidth;

	this._btnPausePointRadius = windowWidth/32;
	if(this._btnPausePointRadius<25)this._btnPausePointRadius=25;
	if(this._btnPausePointRadius>70)this._btnPausePointRadius=70; 

	this._btnPausePoint = new THREE.Vector2(
			windowWidth - this._btnPausePointRadius - 20,
			this._btnPausePointRadius + 20
		);
};

application.controller.touches.buttons.TouchPadButtons.prototype.draw = function(ctx,windowWidth,windowHeight){ 
	
	if(this._lastWindowWidth!=windowWidth){
		this.restorePoints(windowWidth,windowHeight);
	}

	var x,y;
	//drawing btn pause 
	//----------------------------------
	if(this._paused){
		ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
	}else{
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	}
	
	ctx.beginPath();
	x = this._btnPausePoint.x;
	y = this._btnPausePoint.y;
	ctx.arc(x,y,this._btnPausePointRadius,0,2*Math.PI);
	ctx.fill();
	//----------------------------------
	if(this._paused===false && this._pressedBtnDirection!==0){
		var posX,posY,_wWidth,_wHeight;
		posY = 0;
		_wHeight = windowHeight;

		ctx.beginPath();
		x = this._btnPausePoint.x;
		y = this._btnPausePoint.y;
		if(this._pressedBtnDirection===1){
			posX = windowWidth * 3/4;
			_wWidth = windowWidth / 4;
		}else{
			posX = windowWidth / 2;
			_wWidth = windowWidth / 4;
		} 
		ctx.fillRect(posX,posY,_wWidth,_wHeight);
	}  
};