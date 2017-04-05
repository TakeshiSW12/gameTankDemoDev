//package definition
var application = application || {}; 
application.audio = application.audio || {};
//--- end -- package definition--------------
application.audio.AudioManager = (
	function(){
		var instance = null;
		AudioManager = function(){ 	
			this._sounds = {};  
			this._volume = 1.0;
			/*
			this.playAfterFinishID = ["glitch"];
			this.removeOnFinishID = ["explosion_roca"];
			*/
		};
		AudioManager.prototype = {
			constructor : application.audio.AudioManager, 
			addVolume:function(value){
				this._volume += value;
				if(this._volume>1)this._volume=1.0;
				if(this._volume<0)this._volume=0.0;
				console.log("volume : "+this._volume);
			},
			getVolume:function(){
				return this._volume;
			},
			play:function(sound){
				if(!__fileManager)return;
				if(application.utilities.Util.isMobile())return;
				var el,sounds,el_temp;
				var _this = this;
				sounds = this._sounds[sound]; 
				el = __fileManager.getById(sound).getElement();
				var the_sound = null; 


				if(!sounds){ 
					if(el){
						this._sounds[sound] = [];
						the_sound = el_temp = el.cloneNode();
						the_sound.index = this._sounds[sound].push(el_temp) -1; 
						el_temp.volume = instance._volume;
						el_temp.play();
					}
				}else{
					if(Array.isArray(sounds)){
						var check = false;
						for(var i in sounds){ 
							the_sound = el_temp = sounds[i];
							if(el_temp && (el_temp.duration<=0 || el_temp.paused)){
								check = true;
								el_temp.volume = instance._volume;
								el_temp.play();
								break;
							}
						}
						if(
							!check && 
							el/* && 
							!application.utilities.Util.inArray(sound,this.playAfterFinishID)*/
						){
							the_sound = el_temp = el.cloneNode();
							the_sound.index = sounds.push(el_temp) -1;
							el_temp.volume = instance._volume;
							el_temp.play();
						}
					}
				}
				/*
				if(the_sound && application.utilities.Util.inArray(sound,this.removeOnFinishID)){
					var onFinish = function(e){
						var element = e.target;
						_this._sounds[element.attr].splice(element.index,1);
					};
					the_sound.attr = sound;
					the_sound.addEventListener("ended",onFinish,false);
				}
				*/
			}
		}; 
		return {
			getInstance:function(){
				if(!instance){
					instance = new AudioManager();
				}
				return instance;
			} 
		};
	}
)();