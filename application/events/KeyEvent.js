//package definition
var application = application || {}; 
application.events = application.events || {};
//--- end -- package definition--------------

application.events.KeyEvent = (
	function(){

		var instance=undefined;
		var installed = false;

		KeyEvent = function(){ 

			this.keyUps = {};

			this.key_W = false;
			this.key_A = false;
			this.key_S = false;
			this.key_D = false;
			this.key_Z = false;
			this.key_X = false;
			this.key_C = false;
			this.key_Q = false;
			this.key_E = false;
			this.key_F = false;
			this.key_H = false;
			this.key_G = false;
			this.key_T = false;
			this.key_SPACE = false;
			this.key_CONTROL = false;
			this.key_CAPS_LOCK = false;
			this.key_TAB = false;
			this.key_SHIT = false;
			this.key_UP = false;
			this.key_LEFT = false;
			this.key_DOWN = false;
			this.key_RIGHT = false;
		};
		KeyEvent.prototype ={
			constructor:application.events.KeyEvent,
			install:function(){

				if(installed)return;
				installed = true;

				var _this = this;
				window.onkeydown=function(ev){
					var key = ev.keyCode || ev.which; 
					if(key==65){_this.key_A=true;}
					if(key==81){_this.key_Q=true;}
					if(key==87){_this.key_W=true;}
					if(key==83){_this.key_S=true;}
					if(key==68){_this.key_D=true;}
					if(key==90){_this.key_Z=true;}
					if(key==88){_this.key_X=true;}
					if(key==67){_this.key_C=true;}
					if(key==69){_this.key_E=true;}
					if(key==70){_this.key_F=true;}
					if(key==72){_this.key_H=true;}
					if(key==71){_this.key_G=true;}
					if(key==84){_this.key_T=true;}
					if(key==85){_this.key_U=true;}
					if(key==74){_this.key_J=true;}
					if(key==75){_this.key_K=true;}
					if(key==89){_this.key_Y=true;}
					if(key==73){_this.key_I=true;}
					if(key==78){_this.key_N=true;}
					if(key==77){_this.key_M=true;}
					if(key==32){_this.key_SPACE=true;}
					if(key==17){_this.key_CONTROL=true;}
					if(key==20){_this.key_CAPS_LOCK=true;}
					if(key==9){	_this.key_TAB=true;}
					if(key==16){_this.key_SHIT=true;}
					if(key==38){_this.key_UP=true;}
					if(key==37){_this.key_LEFT=true;}
					if(key==40){_this.key_DOWN=true;}
					if(key==39){_this.key_RIGHT=true;}
				};
				window.document.onkeyup=function(ev){
					var key = ev.keyCode || ev.which; 
					_this.keyUps["ku_"+key] = true;
					if(key==65){_this.key_A=false;}
					if(key==81){_this.key_Q=false;}
					if(key==87){_this.key_W=false;}
					if(key==83){_this.key_S=false;}
					if(key==68){_this.key_D=false;}
					if(key==90){_this.key_Z=false;}
					if(key==88){_this.key_X=false;}
					if(key==67){_this.key_C=false;}
					if(key==69){_this.key_E=false;}
					if(key==70){_this.key_F=false;}
					if(key==72){_this.key_H=false;}
					if(key==71){_this.key_G=false;}
					if(key==84){_this.key_T=false;}
					if(key==85){_this.key_U=false;}
					if(key==74){_this.key_J=false;}
					if(key==75){_this.key_K=false;}
					if(key==89){_this.key_Y=false;}
					if(key==73){_this.key_I=false;}
					if(key==78){_this.key_N=false;}
					if(key==77){_this.key_M=false;}
					if(key==32){_this.key_SPACE=false;}
					if(key==17){_this.key_CONTROL=false;}
					if(key==20){_this.key_CAPS_LOCK=false;}
					if(key==9){	_this.key_TAB=false;}
					if(key==16){_this.key_SHIT=false;}
					if(key==38){_this.key_UP=false;}
					if(key==37){_this.key_LEFT=false;}
					if(key==40){_this.key_DOWN=false;}
					if(key==39){_this.key_RIGHT=false;}
				};
			}
		};
		return {
			getInstance: function () {
			    if (!instance) {
			        instance = new KeyEvent();
			    }
			    return instance;
			}
		};
	}

)(); 