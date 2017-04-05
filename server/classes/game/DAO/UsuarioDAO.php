<?php
	namespace server\game\DAO; 
	use server\game\DAO\IUsuarioDAO; 
	use server\game\DAO\AccesoDB; 
	use server\game\DAO\UsuarioTO; 


	use server\game\DAO\DAOFactory;
	
	use server\game\DAO\IHistorialDAO;
	use server\game\DAO\HistorialDAO;
	class UsuarioDAO implements IUsuarioDAO{
		private $accesoDB;
		function __construct(){
			$this->accesoDB = AccesoDB::getInstance();
		}
	    public function listaUsuarios(){
	    	$query ="
	    		select id,nombres,apellidos,email,facebookID from usuario
	    	";
	    	$result = $this->accesoDB->query($query);
	    	if($result==null){
	    		return null;
	    	}else{
	    		if(is_object($result) && $result->num_rows>0){
	    			$rows = null;
	    			$arr = array();
	    			while(($row=$result->fetch_array())!=null){
	    				$usuarioTO = new UsuarioTO();
	    				$usuarioTO->setID($row["id"]);
	    				$usuarioTO->setNombres($row["nombres"]);
	    				$usuarioTO->setApellidos($row["apellidos"]);
	    				$usuarioTO->setEmail($row["email"]);
	    				$usuarioTO->setFacebookID($row["facebookID"]);
	    				$arr[] = $usuarioTO;
	    			}
	    			return $arr;
	    		}
	    	}
	    	return null;
	    }
	    public function insertarUsuario($usuarioTO=null){
	    	if($usuarioTO!=null && $usuarioTO instanceof UsuarioTO){
	    		$query ="
	    			insert into usuario(
	    				nombres,
	    				apellidos,
	    				email,
	    				facebookID
	    			)values(
	    				'".$usuarioTO->getNombres()."',
	    				'".$usuarioTO->getApellidos()."',
	    				'".$usuarioTO->getEmail()."',
	    				'".$usuarioTO->getFacebookID()."'
	    			)
	    		";
	    		$result = $this->accesoDB->query($query);
	    		if($result){
	    			return array("msg"=>"insertado","id"=>$this->accesoDB->getConnection()->insert_id);
	    		}
	    		return array("msg"=>"no se puedo insertar nuevo registro de usuario");
	    	}
	    	return null;
	    }
	    public function actualizarUsuario($usuarioTO=null){
	    	if(
	    		$usuarioTO!=null && 
	    		$usuarioTO instanceof UsuarioTO && 
	    		preg_match("/^[0-9]+$/",$usuarioTO->getID()) && 
	    		$usuarioTO->getID()>0
	    	){
	    		$query =" 
	    			update usuario 
	    			set 
	    				nombres 	='".$usuarioTO->getNombres()."',
	    				apellidos 	='".$usuarioTO->getApellidos()."',
	    				email 		='".$usuarioTO->getEmail()."',
	    				facebookID 	='".$usuarioTO->getFacebookID()."' 
	    			where 
	    				id='".$usuarioTO->getID()."' 
	    		";
	    		$result = $this->accesoDB->query($query);
	    		if($result){
	    			return array("msg"=>"usuario actualizado");
	    		}
	    	}
	    	return null;

	    }
	    public function eliminarUsuario($usuarioIDs=array()){
	    	foreach($usuarioIDs AS $key=>$Id){
	    		if(preg_match("/^[0-9]+$/",$Id) && $Id>0){
	    			$query =" 
		    			delete from usuario  
		    			where 
		    				id='".$Id."' 
		    		";
		    		$result = $this->accesoDB->query($query);
	    		}
	    	}
	    }
	    public function datoUsuarioPorID($usuarioID){
	    	if(preg_match("/^[0-9]+$/",$usuarioID) && $usuarioID>0){
	    		$query =" 
		    		select 
		    			id,
		    			nombres,
		    			apellidos,
		    			email,
		    			facebookID 
		    		from 
		    			usuario  
		    		where 
		    			id='".$usuarioID."' 
		    	";
		    	$result = $this->accesoDB->query($query);
		    	if(is_object($result) && $result->num_rows>0){
		    		$row = $result->fetch_array();
		    		$usuarioTO = new UsuarioTO();
		    		$usuarioTO->setID($row["id"]);
		    		$usuarioTO->setNombres($row["nombres"]);
		    		$usuarioTO->setApellidos($row["apellidos"]);
		    		$usuarioTO->setEmail($row["email"]);
		    		$usuarioTO->setFacebookID($row["facebookID"]);
		    		return $usuarioTO;
		    	}
	    	}
	    	return null;
	    }
	    public function datoUsuarioPorFacebookID($facebookID){
	    	if(preg_match("/^[0-9]+$/",$facebookID) && $facebookID>0){
	    		$query =" 
		    		select 
		    			id,
		    			nombres,
		    			apellidos,
		    			email,
		    			facebookID 
		    		from 
		    			usuario  
		    		where 
		    			facebookID='".$facebookID."' 
		    	";
		    	$result = $this->accesoDB->query($query);
		    	if(is_object($result) && $result->num_rows>0){
		    		$row = $result->fetch_array();
		    		$usuarioTO = new UsuarioTO();
		    		$usuarioTO->setID($row["id"]);
		    		$usuarioTO->setNombres($row["nombres"]);
		    		$usuarioTO->setApellidos($row["apellidos"]);
		    		$usuarioTO->setEmail($row["email"]);
		    		$usuarioTO->setFacebookID($row["facebookID"]);
		    		return $usuarioTO;
		    	}
	    	}
	    	return null;
	    }
	    public function listaHistorialesDeUsuario($usuarioID){
	    	if(preg_match("/^[0-9]+$/",$usuarioID) && $usuarioID>0){
	    		$daoFactory = DAOFactory::getInstance();
	    		$historialDAO = $daoFactory->getHistorialDAO();
	    		$historiales = $historialDAO->listaHistoriales($usuarioID);
	    		if($historiales){
	    			return $historiales;
	    		}
	    	}
	    	return null;
	    } 
	}

?>