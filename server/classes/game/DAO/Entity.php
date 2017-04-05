<?php 
	namespace server\game\DAO;
	class Entity{
		protected $data = array(); 
		function __construct(){ 
		}
		public function __set($name, $value){ 
	        $this->data[$name] = $value;
	    }

	    public function __get($name){
	    	if(array_key_exists($name,$this->data)){
	    		return $this->data[$name];
	    	}
	    	return null;
	    }
	    public function __isset($name){ 
	        return isset($this->data[$name]);
	    } 
	    public function __unset($name){
	    	unset($this->data[$name]);
	    } 
	    public function toArray(){
	    	return $this->data;
	    }
	    public function arrayToString($arr_values){
	    	$arr =array();
	    	foreach($arr_values AS $key=>$value){
	    		$arr2 = array();
	    		if(is_array($value)){
	    			$nn = $this->arrayToString($value);
	    			$arr[] = $key."=[".$nn."]";
	    		}
	    		else{
	    			$arr[] = $key."=".$value;
	    		}	    		
	    	}
	    	return implode(",",$arr);
	    }
	    public function __toString(){
	    	$class_name = get_class($this);
	    	/*
	    	$arr =array();
	    	foreach($this->data AS $key=>$value){
	    		$arr2 = array();
	    		if(is_array($value)){
	    			foreach($value AS $k=>$v ){
	    				$arr2[] = $k."=".$v;
	    			} 
	    			$arr[] = $key."=[".implode(",",$arr2)."]";
	    		}
	    		else{
	    			$arr[] = $key."=".$value;
	    		} 
	    	}
	    	*/
	    	$values = $this->arrayToString($this->data);
	    	//$string = "::object[".$class_name."]=>properties[".implode(",",$arr)."]";
	    	$string = "::object[".$class_name."]=>properties[".$values."]";
	    	return $string;
	    } 
	}

?>