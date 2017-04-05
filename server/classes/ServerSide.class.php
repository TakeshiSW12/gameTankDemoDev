<?php 
	namespace server;

	use server\game\Utils;
	use server\game\handlers\Handler;

	class ServerSide{

		private $handler;
		function __construct(){   
			$this->handler = new Handler($this);
		}
		public function run(){
			$action = ""; 
			$response = "";
			if(is_array($_POST)){
			
				$action = Utils::getDataFromArray("action",$_POST);   
				switch($action){
					case "update":
						$response = $this->handler->updateInfo(Utils::getDataFromArray("data",$_POST));
					break;
					case "query":
						$response = $this->handler->getInfo("history");
					break;
					case "auth":
						$response = $this->handler->authenticate($_POST); 
					break;
					default:
						Utils::printString("action_undefined");
				} 
			}
			if(is_array($response)){
				Utils::printString(json_encode($response));
			}
		}
		function __destruct(){
			
		}
	}
?> 