<?php 
	
	namespace server\game\DAO;

	use server\game\DAO\Entity;
	class UsuarioTO extends Entity{
		function __construct(){

		}
		public function setID($id){
			$this->id = $id;
		}
		public function getID(){
			return $this->id;
		}
		public function setNombres($nombres){
			$this->nombres = $nombres;
		}
		public function getNombres(){
			return $this->nombres;
		}
		public function setApellidos($apellidos){
			$this->apellidos = $apellidos;
		}
		public function getApellidos(){
			return $this->apellidos;
		}
		public function setEmail($email){
			$this->email = $email;
		}
		public function getEmail(){
			return $this->email;
		}
		public function setFacebookID($facebookID){
			$this->facebookID = $facebookID;
		}
		public function getFacebookID(){
			return $this->facebookID;
		}
		function __destruct(){
			
		}
	}
?>