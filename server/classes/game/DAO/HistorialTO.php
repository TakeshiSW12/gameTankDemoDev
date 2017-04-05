<?php 
	
	namespace server\game\DAO;

	use server\game\DAO\Entity;
	class HistorialTO extends Entity{
		function __construct(){

		}
		public function setID($id){
			$this->id = $id;
		}
		public function getID(){
			return $this->id;
		}
		public function setVidaRestante($vida_restante){
			$this->vida_restante = $vida_restante;
		}
		public function getVidaRestante(){
			return $this->vida_restante;
		}
		public function setTotalDanio($total_danio){
			$this->total_danio = $total_danio;
		}
		public function getTotalDanio(){
			return $this->total_danio;
		}
		public function setNumEnemigosAbatidos($num_enemigos_abatidos){
			$this->num_enemigos_abatidos = $num_enemigos_abatidos;
		}
		public function getNumEnemigosAbatidos(){
			return $this->num_enemigos_abatidos;
		}
		public function setTiempoSegundosAlcanzado($tiempo_segundos_alcanzado){
			$this->tiempo_segundos_alcanzado = $tiempo_segundos_alcanzado;
		}
		public function getTiempoSegundosAlcanzado(){
			return $this->tiempo_segundos_alcanzado;
		}
		public function setNumItemsCapturados($num_items_capturados){
			$this->num_items_capturados = $num_items_capturados;
		}
		public function getNumItemsCapturados(){
			return $this->num_items_capturados;
		}
		public function setUsuarioID($usuarioID){
			$this->usuarioID = $usuarioID;
		}
		public function getUsuarioID(){
			return $this->usuarioID;
		}
		function __destruct(){
			
		}
	}
?>