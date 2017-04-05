//package definition
var application = application || {}; 
application.files = application.files || {};
//--- end -- package definition--------------
application.files.File = function(name,url,id,type){
	this._name = name;
	this._url = url;
	this._id = id;
	this._type = type;
	this.loaded = 0;
	this.totalSize = -1;

	this.readyState = null;
	this.status 	= null; 
	this.checked 	= false; 
	this._element 	= null;//window.HTMLElement
};
application.files.File.prototype = {
	constructor:application.files.File,
	setName:function(n){
		this._name = n;
	},
	getName:function(){
		return this._name;
	},
	setURL:function(u){
		this._url = u;
	},
	getURL:function(){
		return this._url;
	},
	setID:function(id){
		this._id = id;
	},
	getID:function(){
		return this._id;
	},
	setType:function(t){
		this._type = t;
	},
	getType:function(){
		return this._type;
	}, 
	onProgress:function(chunk){
		//chunk type XMLHttpRequestProgressEvent. 
		this.totalSize 	= chunk.total ? chunk.total : (chunk.totalSize ? chunk.totalSize : 0);
		this.loaded 	= chunk.loaded;

	},
	onLoad:function(response){  
		if(!this._element){
			switch(this._type){
				case 'img':
					this._element = new Image();
					this._element.src = this._url;
					this._element.alt = this._name;
				break;
				case 'wav':
				case 'ogg':
				case 'mp3': 
					this._element = document.createElement("audio");
					this._element.src = this._url;
					this._element.alt = this._name;
				break;
				default: 
					this._element = null;
			}
		}
	},
	getElement:function(){ 
		if(!this._element){
			if(!application.utilities.Util.isMobile()){
				switch(this._type){ 
					case 'wav':
					case 'ogg':
					case 'mp3': 
						this._element = document.createElement("audio");
						this._element.src = this._url;
						this._element.alt = this._name; 
					break;
					default:  
				}
			}
			
		}
		if(
			this._element instanceof Audio && 
			typeof this._element.readyState!="undefined" && 
			this._element.readyState==4
		){
			return this._element;
		}
		if(
			this._element && 
			!(this._element instanceof Audio)   
		){
 			return this._element;
		}
		return null;
	},
	computePercent:function(){
		if(this.totalSize==-1){
			return this.totalSize;
		}
		if(this.totalSize==0){
			return null;
		}
		var p =  this.loaded / this.totalSize;
		return p;
	}
};