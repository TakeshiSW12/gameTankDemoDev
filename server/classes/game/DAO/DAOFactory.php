<?php
	namespace server\game\DAO;  

	use server\game\DAO\UsuarioDAO;
	use server\game\DAO\HistorialDAO;
	class DAOFactory{
		private static $instance = null;
		private function __construct(){

		}
		public static function getInstance(){
			if(self::$instance==null){
				self::$instance = new DAOFactory();
			}
			return self::$instance;
		}
		public function getUsuarioDAO(){
			return new UsuarioDAO();
		}
		public function getHistorialDAO(){
			return new HistorialDAO();
		}
	}