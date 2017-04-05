//package definition
var application = application || {}; 
application.utilities = application.utilities || {};
//--- end -- package definition--------------
//-----------------------------------------------------------------
application.utilities.Util = function(){};
application.utilities.Util.globalRand = Math.random(); 
application.utilities.Util.inArray = function (str,array) {
	if(Array.isArray(array) && array.length>0 && str.trim()!=""){
		for(var i in array){
			if(str==array[i]){
				return true;
			}
		}
	}
	return false;
};
application.utilities.Util.globalVolume = 0.5;
application.utilities.Util.maxGlobalVolume = 1.0;
application.utilities.Util.isTouch = function(){
	var touchable =  
		('ontouchstart' in window) || 
		("ontouchstart" in document.documentElement) || 
		('touchstart' in window) || 
		("touchstart" in document.documentElement)  

		? true:false; 
	return touchable;
};
application.utilities.Util.Vector3String = function(v){
	return "THREE.Vector3[x="+v.x+",y="+v.y+",z="+v.z+"]";
};
application.utilities.Util.isMobile = function(){
	var check =  
		isMobile.apple.phone ||  
		isMobile.apple.ipod || 
		isMobile.apple.tablet ||   
		isMobile.android.phone || 
		isMobile.android.tablet || 
		isMobile.amazon.phone || 
		isMobile.amazon.tablet || 
		isMobile.windows.phone || 
		isMobile.windows.tablet;
		return check;
};
application.utilities.Util.generateUUID = function () {
	// http://www.broofa.com/Tools/Math.uuid.htm
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
	var uuid = new Array( 36 );
	var rnd = 0, r;
	return function () {
		for ( var i = 0; i < 36; i ++ ) {
			if ( i === 8 || i === 13 || i === 18 || i === 23 ) {
				uuid[ i ] = '-';
			} else if ( i === 14 ) {
				uuid[ i ] = '4';
			} else {
				if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
				r = rnd & 0xf;
				rnd = rnd >> 4;
				uuid[ i ] = chars[ ( i === 19 ) ? ( r & 0x3 ) | 0x8 : r ];
			}
		}
		return uuid.join( '' );

	};

}();