<?php 
	namespace server\game\DAO; 
  
	interface IUsuarioDAO {
	    public function listaUsuarios(); 
	    public function listaHistorialesDeUsuario($usuarioID); 
	    public function insertarUsuario($usuarioTO=null); 
	    public function actualizarUsuario($usuarioTO=null); 
	    public function eliminarUsuario($usuarioIDs=array()); 
	    public function datoUsuarioPorID($usuarioID); 
	    public function datoUsuarioPorFacebookID($facebookID); 
	}
?> 