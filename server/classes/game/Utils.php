<?php 
	namespace server\game;
	class Utils{

		public static function printString($string=""){
			echo $string;
		}
		public static function getDataFromArray($key,$array){

			return array_key_exists($key,$array) ? \trim($array[$key]) : "";
 
		}
	}
?>