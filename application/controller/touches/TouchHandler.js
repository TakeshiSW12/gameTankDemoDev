//package definition
var application = application || {}; 
application.controller = application.controller || {};
application.controller.touches = application.controller.touches || {};
//--- end -- package definition--------------
application.controller.touches.TouchHandler = (
	function(){
		var instance = null;
		TouchHandler = function(parent){
			this._parent 			= parent;
			this._touchMove 		= new application.controller.touches.TouchMove(this);
			this._touchAttack 		= new application.controller.touches.TouchAttack(this);
			this._touchPadButtons 	= new application.controller.touches.buttons.TouchPadButtons(this);
			this._screenUtil 		= application.game.utilities.Screen.getInstance(null);

			this._touchPadButtons.restorePoints(this._screenUtil.getWidth(),this._screenUtil.getHeight());

		};
		TouchHandler.prototype = {
			constructor:application.controller.touches.TouchHandler,
			getParent:function(){
				return this._parent;
			},
			getTouchMove:function(){
				return this._touchMove;
			},
			canMove:function(){
				return this._touchMove.getTouchID()!==null && !this._touchPadButtons.isPaused();
			},
			isPaused:function(){
				return this._touchPadButtons.isPaused();
			},
			canAttack:function(){
				return this._touchAttack.canAttack();
			},
			getMoveValues:function(){
				if(this.canMove()){
					var arr = [];
					arr.push(this._touchMove.getToPoint().x - this._touchMove.getFromPoint().x);
					arr.push(this._touchMove.getToPoint().y - this._touchMove.getFromPoint().y);
					
					return arr;
				}
				return null;
			},
			canGoForward:function(){
				return this._touchPadButtons && this._touchPadButtons.getPressedBtnDirection()===-1;
			},
			canGoBackward:function(){
				return this._touchPadButtons && this._touchPadButtons.getPressedBtnDirection()===1;
			},
			getPressedBtnDirection:function(){
				return this._touchPadButtons.getPressedBtnDirection();
			},
			onTouchEvent:function(e,action){
				var str = "onTouchEvent ";
				switch(action){
					case "start": 
						var touch = e.changedTouches[0];
						var x = touch.pageX || touch.clientX || touch.screenX;
						var y = touch.pageY || touch.clientY || touch.screenY; 

						//-----------------------------------------
						if(this._touchAttack.getRadius()!==0){
							var _v2 = new THREE.Vector2(x,y);
							if(_v2.distanceTo(this._touchAttack.getCenter())<this._touchAttack.getRadius()){
								this._touchAttack.setCanAttack(!this._touchAttack.canAttack());
							}
						}
						//-----------------------------------------

						if(x<this._screenUtil.getWidth()/2){ 
							if(this._touchMove.getTouchID()===null){
								this._touchMove.setTouchID(touch.identifier);
								this._touchMove.setFromPoint(new THREE.Vector2(x,y));
								this._touchMove.setToPoint(new THREE.Vector2(x,y));
							} 
						}else{
							if(this._touchPadButtons.getTouchID()===null){
								this._touchPadButtons.setTouchID(touch.identifier);
								var _width = this._screenUtil.getWidth() * 3/4;
								if(x<_width) {
									this._touchPadButtons.setPressedBtnDirection("left");
								}else{  
									var temp_point = new THREE.Vector2(x,y);
									var pausePoint = this._touchPadButtons.getBtnPausePoint();
									if(pausePoint!=null){ 
										var distance = pausePoint.distanceTo(temp_point);
										if(distance<this._touchPadButtons.getBtnPausePointRadius()){ 
											if(this._touchPadButtons.isPaused()){
												this._touchPadButtons.setPaused(false);
											}else{
												this._touchPadButtons.setPaused(true);
											}										
											this._touchPadButtons.setPressedBtnDirection("none");	
										}else{
											this._touchPadButtons.setPressedBtnDirection("right");
										}
									}
								}
							} 
						}
					break;
					case "end":
						var touch = null,x,y;
						var touches = e.changedTouches;
						for(var i in touches){
							touch = touches[i];
							x = touch.pageX || touch.clientX || touch.screenX;
							y = touch.pageY || touch.clientY || touch.screenY;
							if(
								this._touchMove.getTouchID()!==null && 
								touch.identifier===this._touchMove.getTouchID()
							){
								this._touchMove.setTouchID(null);
							}else{
								if(
									this._touchPadButtons.getTouchID()!==null && 
									touch.identifier===this._touchPadButtons.getTouchID()
								){
									this._touchPadButtons.setTouchID(null);
									this._touchPadButtons.setPressedBtnDirection("none");
								}else{

								}

							}
						}
					break;
					case "cancel":
						var touch = null,x,y;
						var touches = e.changedTouches;
						for(var i in touches){
							touch = touches[i];
							x = touch.pageX || touch.clientX || touch.screenX;
							y = touch.pageY || touch.clientY || touch.screenY;
							if(
								this._touchMove.getTouchID()!==null && 
								touch.identifier===this._touchMove.getTouchID()
							){
								this._touchMove.setTouchID(null);
							}else{
								if(
									this._touchPadButtons.getTouchID()!==null && 
									touch.identifier===this._touchPadButtons.getTouchID()
								){
									this._touchPadButtons.setTouchID(null);
									this._touchPadButtons.setPressedBtnDirection("none");
								}else{

								}

							}
						}
					break;
					case "leave":
						var touch = null,x,y;
						var touches = e.changedTouches;
						for(var i in touches){
							touch = touches[i];
							x = touch.pageX || touch.clientX || touch.screenX;
							y = touch.pageY || touch.clientY || touch.screenY;
							if(
								this._touchMove.getTouchID()!==null && 
								touch.identifier===this._touchMove.getTouchID()
							){
								this._touchMove.setTouchID(null);
							}else{
								if(
									this._touchPadButtons.getTouchID()!==null && 
									touch.identifier===this._touchPadButtons.getTouchID()
								){
									this._touchPadButtons.setTouchID(null);
									this._touchPadButtons.setPressedBtnDirection("none");
								}else{

								}

							}
						}
					break;
					case "move":
						var touch = null,x,y;
						var touches = e.changedTouches;
						for(var i in touches){
							touch = touches[i];
							x = touch.pageX || touch.clientX || touch.screenX;
							y = touch.pageY || touch.clientY || touch.screenY;
							if(
								this._touchMove.getTouchID()!==null && 
								touch.identifier===this._touchMove.getTouchID()
							){
								if(
									x>=this._screenUtil.getWidth()/2
								){
									this._touchMove.setTouchID(null);
								}else{
									if(this._touchMove.getFromPoint()!=null){
									if(this._touchMove.getToPoint()!=null){
										this._touchMove.getToPoint().x = x;
										this._touchMove.getToPoint().y = y;
									}else{
										this._touchMove.setToPoint(new THREE.Vector2(x,y));
									} 
								}
								}
							}else{
								if(
									this._touchPadButtons.getTouchID()!==null && 
									touch.identifier===this._touchPadButtons.getTouchID()
								){
									if(x<this._screenUtil.getWidth()/2){ 
										this._touchPadButtons.setPressedBtnDirection("none");
									}else{
										var _width = this._screenUtil.getWidth() * 3/4;
										if(x<_width){
											this._touchPadButtons.setPressedBtnDirection("left");
										}else{
											this._touchPadButtons.setPressedBtnDirection("right");
										}
									}
								}else{

								}
							}
						}
					break;
					default:
				}
				//alert(str);
				this.paint();	 
					
			}, 
			paint:function(){
				this.draw(); 
				
			}, 
			draw:function(){
				if(!application.utilities.Util.isTouch()){ 
				//if(!application.utilities.Util.isMobile()){  
					return;
				} 
				var _p = this.getParent();
				if(_p && _p.getContext && this._screenUtil){
					var context = _p.getContext();
					if(context){ 
						context.clearRect(
							0,
							0,
							this._screenUtil.getWidth(),
							this._screenUtil.getHeight()
						);  
						if(!this._touchPadButtons.isPaused()){
							this._touchMove.draw(
								context,
								this._screenUtil.getWidth(),
								this._screenUtil.getHeight()
							); 	
						} 
						this._touchPadButtons.draw(
							context,
							this._screenUtil.getWidth(),
							this._screenUtil.getHeight()
						);   
						this._touchAttack.draw(
							context,
							this._screenUtil.getWidth(),
							this._screenUtil.getHeight()
						);   
					} 
				}
				
			}
		};
		return {
			getInstance:function(parent){
				if(instance==null){
					instance = new TouchHandler(parent);
				}
				return instance;
			}
		};
	}
)();