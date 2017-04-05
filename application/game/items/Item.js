//package definition
var application = application || {}; 
application.game = application.game || {};
application.game.items = application.game.items || {};
//--- end -- package definition--------------
application.game.items.Item = function(parent,mesh,position){
	this._parent = parent;
	this._mesh = mesh; 
	this.setPosition(position);
};
application.game.items.Item.prototype = {
	getParent:function(){
		return this._parent;
	},
	getMesh:function(){
		return this._mesh;
	},
	getPosition:function(){
		return this._position;
	},
	isVisible:function(){
		return this._mesh.visible;
	},
	setVisible:function(visible){
		this._mesh.visible = visible;
	},
	setPosition:function(position){
		this._position = position; 
		this._mesh.position.copy(this._position);
	}
};