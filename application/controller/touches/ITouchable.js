//package definition
var application = application || {}; 
application.controller = application.controller || {};
application.controller.touches = application.controller.touches || {};
//--- end -- package definition--------------

//Interface Button
application.controller.touches.ITouchable = function(){};
application.controller.touches.ITouchable.prototype = {
	draw : function(ctx,windowWidth,windowHeight){
		/*
		dibuja el boton en pantalla.
		*/
		throw new Exception("debe implementarse esta función.");
	},
	restorePoints:function(windowWidth,windowHeight){
		/*
		escala el dibujo del botón cuando el dispositivo/aplicativo 
		donde corre la aplicación sufre un cambio en su ancho y largo(width,height)
		*/
		throw new Exception("debe implementarse esta función.");
	}
};