<?php 
	error_reporting(E_ALL);		
	session_start(); 
	$filename[] = "classes/ServerSide.class.php"; 
	//$filename[] = "classes/game/IGame.interface.php"; 
	$filename[] = "classes/game/Utils.php"; 
	$filename[] = "classes/game/DAO/Entity.php"; 
	$filename[] = "classes/game/DAO/AccesoDB.php"; 
	$filename[] = "classes/game/DAO/DAOFactory.php"; 
	$filename[] = "classes/game/DAO/IUsuarioDAO.php"; 
	$filename[] = "classes/game/DAO/UsuarioDAO.php"; 
	$filename[] = "classes/game/DAO/IHistorialDAO.php"; 
	$filename[] = "classes/game/DAO/HistorialDAO.php"; 
	$filename[] = "classes/game/DAO/UsuarioTO.php"; 
	$filename[] = "classes/game/DAO/HistorialTO.php"; 
	$filename[] = "classes/game/handlers/Handler.php"; 
	$exists = true;
	$last_include = "";
	foreach($filename AS $key=>$value){
		if(!file_exists($value)){
			$exists = false;
			echo "<br />".$value;
		}
		else{
			require_once $value; 
		}
		
	}
	
	if(!$exists){
		echo "<br />some files does not exists";
		die();
	}
	
	
	use server\ServerSide; 
	if(!class_exists("server\ServerSide")){
		echo "<br />main class not found";
		die();
	} 
	if(!class_exists("server\game\Utils")){
		echo "<br />utils class not found";
		die();
	} 
	if(!class_exists("server\game\handlers\Handler")){
		echo "<br />handler class not found";
		die();
	} 
	/*
	if(!interface_exists("server\game\IGame")){
		echo "<br />interface Game not found";
		die();
	} 
	*/

		
	$obj = new ServerSide();
	$obj->run();	
?>