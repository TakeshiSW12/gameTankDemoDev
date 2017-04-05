<?php
	namespace server\game\DAO; 
	use server\game\DAO\IHistorialDAO; 
	use server\game\DAO\AccesoDB; 
	use server\game\DAO\HistorialTO; 
	class HistorialDAO implements IHistorialDAO{
		private $accesoDB;
		function __construct(){
			$this->accesoDB = AccesoDB::getInstance();
		}
	    public function listaHistoriales($usuarioID=null){
	    	$extra_str = "";
	    	if($usuarioID!=null && $usuarioID>0){
	    		$extra_str = "where usuarioID = " . $usuarioID;
	    	}
	    	$query ="
	    		select 
	    			id,
	    			vida_restante,
	    			total_danio,
	    			num_enemigos_abatidos,
	    			tiempo_segundos_alcanzado,
	    			num_items_capturados,
	    			usuarioID 
	    		from 
	    			historial 
	    	" . $extra_str;
	    	$result = $this->accesoDB->query($query);
	    	if($result==null){
	    		return null;
	    	}else{
	    		if(is_object($result) && $result->num_rows>0){
	    			$rows = null;
	    			$arr = array();
	    			while(($row=$result->fetch_array())!=null){
	    				$historialTO = new HistorialTO();
	    				$historialTO->setID($row["id"]);
	    				$historialTO->setVidaRestante($row["vida_restante"]);
	    				$historialTO->setTotalDanio($row["total_danio"]);
	    				$historialTO->setNumEnemigosAbatidos($row["num_enemigos_abatidos"]);
	    				$historialTO->setTiempoSegundosAlcanzado($row["tiempo_segundos_alcanzado"]);
	    				$historialTO->setNumItemsCapturados($row["num_items_capturados"]);
	    				if(!isset($usuarioID)){
	    					$historialTO->setUsuarioID($row["usuarioID"]);
	    				}
	    				$arr[] = $historialTO;
	    			}
	    			return $arr;
	    		}
	    	}
	    	return null;
	    }
	    public function insertarHistorial($historialTO=null){
	    	if($historialTO!=null && $historialTO instanceof HistorialTO){
	    		$query ="
	    			insert into historial(
	    				vida_restante,
		    			total_danio,
		    			num_enemigos_abatidos,
		    			tiempo_segundos_alcanzado,
		    			num_items_capturados,
		    			usuarioID 
	    			)values(
	    				'".$historialTO->getVidaRestante()."',
	    				'".$historialTO->getTotalDanio()."',
	    				'".$historialTO->getNumEnemigosAbatidos()."',
	    				'".$historialTO->getTiempoSegundosAlcanzado()."',
	    				'".$historialTO->getNumItemsCapturados()."',
	    				'".$historialTO->getUsuarioID()."'
	    			)
	    		";
	    		$result = $this->accesoDB->query($query);
	    		if($result){
	    			return array("msg"=>"insertado","id"=>$this->accesoDB->getConnection()->insert_id);
	    		}
	    		return array("msg"=>"no se puedo insertar nuevo registro de historial","error"=>$this->accesoDB->getConnection()->error);
	    	}
	    	return null;
	    }
	    public function actualizarHistorial($historialTO=null){
	    	if(
	    		$historialTO!=null && 
	    		$historialTO instanceof HistorialTO && 
	    		preg_match("/^[0-9]+$/",$historialTO->getID()) && 
	    		$historialTO->getID()>0
	    	){
	    		$query =" 
	    			update usuario 
	    			set 
	    				vida_restante 				='".$historialTO->getVidaRestante()."',
	    				total_danio 				='".$historialTO->getTotalDanio()."',
	    				num_enemigos_abatidos 		='".$historialTO->getNumEnemigosAbatidos()."',
	    				tiempo_segundos_alcanzado 	='".$historialTO->getTiempoSegundosAlcanzado()."'  
	    				num_items_capturados 		='".$historialTO->getNumItemsCapturados()."'  
	    			where 
	    				id='".$historialTO->getID()."' 
	    		";
	    		$result = $this->accesoDB->query($query);
	    		if($result){
	    			return array("msg"=>"historial actualizado");
	    		}
	    		return array("msg"=>"no se pudo actualizar el historial","error"=>$this->accesoDB->getConnection()->error);
	    	}
	    	return null;

	    }
	    public function eliminarHistorial($historialIDs=array()){
	    	foreach($historialIDs AS $key=>$Id){
	    		if(preg_match("/^[0-9]+$/",$Id) && $Id>0){
	    			$query =" 
		    			delete from historial  
		    			where 
		    				id='".$Id."' 
		    		";
		    		$result = $this->accesoDB->query($query);
	    		}
	    	}
	    }
	    public function datoHistorialPorID($historialID){
	    	if(preg_match("/^[0-9]+$/",$historialID) && $historialID>0){
	    		$query =" 
		    		select 
		    			id,
	    				vida_restante,
		    			total_danio,
		    			num_enemigos_abatidos,
		    			tiempo_segundos_alcanzado,
		    			num_items_capturados,
		    			usuarioID 
		    		from 
		    			historial  
		    		where 
		    			id='".$historialID."' 
		    	";
		    	$result = $this->accesoDB->query($query);
		    	if(is_object($result) && $result->num_rows>0){
		    		$row = $result->fetch_array();
		    		$historialTO = new HistorialTO();
		    		$historialTO->setID($row["id"]);
		    		$historialTO->setVidaRestante($row["vida_restante"]);
		    		$historialTO->setTotalDanio($row["total_danio"]);
		    		$historialTO->setNumEnemigosAbatidos($row["num_enemigos_abatidos"]);
		    		$historialTO->setTiempoSegundosAlcanzado($row["tiempo_segundos_alcanzado"]);
		    		$historialTO->setNumItemsCapturados($row["num_items_capturados"]);
		    		$historialTO->setUsuarioID($row["usuarioID"]);
		    		return $historialTO;
		    	}
	    	}
	    	return null;
	    } 
	}

?>