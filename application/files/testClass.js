Template = (
	function(){
		var _val = 0;
		C = function(){

		};
		C.prototype = {
			getVal:function(){return _val;},
			setVal:function(val){_val = val}
		};
		return {
			newInstance:function(){
				return new C();
			}
		};
	}
)();