<?php
	namespace server\game\DAO; 
	class AccesoDB{
		private static $instance=null;

		private $connection = null;
		private function __construct(){
			$this->connection = new \mysqli(
					"localhost",
					"tank_attack_game",
					"tank_attack_game",
					"tank_attack_game"
				);
		}
		public static function getInstance(){
			if(self::$instance==null){
				self::$instance = new AccesoDB();
			}
			return self::$instance;
		}
		public function query($query){
			if($this->connection==null)return null;
			return $this->connection->query($query);
		}
		public function getConnection(){
			return $this->connection;
		}
		function __destruct(){
			if($this->connection!=null){
				$this->connection->close();
			}
		}
	}

?>