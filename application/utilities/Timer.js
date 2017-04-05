//package definition
var application = application || {}; 
application.utilities = application.utilities || {};
//--- end -- package definition--------------
//-----------------------------------------------------------------
application.utilities.Timer = (
	function(){
		var instance = null;
		Timer = function(){
			this._time = null;
			this._countSeconds = 0;
			this._clockPased = false;
		};
		Timer.prototype  ={ 
			runClock:function(){
				if(this._time==null){
					this._time = Date.now()/1000;
					instance.adjustClockUI();
				}
				if(this._clockPased){
					this._time = Date.now()/1000;
					this._clockPased = false;
				}
				var lastTime = Date.now()/1000;
				this._countSeconds += lastTime - this._time;
				this._time = lastTime;

			},
			getClockValue:function(){
				return this._countSeconds;
			},
			resetClock:function(){
				this._countSeconds = 0;
				this._time = null;
			},
			pauseClock:function(){
				this._clockPased = true;
			},
			renderClock:function(){
				if(window._timerUI){
					window._timerUI.innerHTML = ""+Math.round(this._countSeconds);  
				}
			},
			adjustClockUI:function(){
				if(window._timerUI){

					var wWidth 	= window.innerWidth;  
					var posX 	= ( wWidth - window._timerUI.offsetWidth)/2; 
					window._timerUI.style.left = posX+"px"; 
					window._timerUI.style.display="inline-block";
				}
				
			}
		};
		return {
			getInstance:function(){
				if(instance==null){
					instance  = new Timer();
				}
				return instance;
			}
		}
	}
)();