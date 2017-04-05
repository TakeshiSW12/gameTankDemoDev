<?php 
	namespace server\game\DAO; 
  
	interface IHistorialDAO {
	    public function listaHistoriales($usuarioID=null); 
	    public function insertarHistorial($historialTO=null); 
	    public function actualizarHistorial($historialTO=null); 
	    public function eliminarHistorial($historialIDs=array()); 
	    public function datoHistorialPorID($historialID); 
	}
?> 