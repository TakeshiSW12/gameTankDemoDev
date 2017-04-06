<?php 
	namespace server\game\handlers;

	use Facebook;

	use server\game\DAO\IUsuarioDAO;
	use server\game\DAO\UsuarioDAO;
	use server\game\DAO\UsuarioTO;

	use server\game\DAO\IHistorialDAO;
	use server\game\DAO\HistorialDAO;
	use server\game\DAO\HistorialTO;
	use server\game\DAO\DAOFactory;

	class Handler{
		private $parent;//ServerSide
		function __construct($parent){   
			$this->parent = $parent;
		} 
		public function updateInfo($data){
			$response["result"]="none";
			$data = json_decode($data,true);
			if(is_array($data) && count($data)>0){
				require_once "classes/Facebook/autoload.php";
				$this->facebook = new Facebook\Facebook(
					array(
						'app_id' => 'xxxxxxx',
						'app_secret' => 'xxxxxxxxxxxxxxxxxxxxx',
						'default_graph_version' => 'v2.2' 
					)
				); 
				try { 
					$access_token = array_key_exists("facebookToken",$_SESSION) ? $_SESSION["facebookToken"] : "";
					if($access_token!=""){
						// Returns a `Facebook\FacebookResponse` object
						//first_name,last_name,middle_name,name_format,gender,email,currency
						$resp = $this->facebook->get('/me?fields=id', $access_token);
						$info = $resp->getGraphUser();  
						if(isset($info) && $info->getId()==$_SESSION["facebookID"]){ 
							$response["result"] = "ok";   
							//----------------------------------------------
							$daoFactory = DAOFactory::getInstance();
							$usuarioDAO = $daoFactory->getUsuarioDAO();

							$usuarioTO = $usuarioDAO->datoUsuarioPorFacebookID($info->getId());

							if($usuarioTO){
								$historialDAO = $daoFactory->getHistorialDAO();
								$historialTO = new HistorialTO();
								$historialTO->setVidaRestante($data["vida_restante"]);
								$historialTO->setTotalDanio($data["total_danio"]);
								$historialTO->setNumEnemigosAbatidos($data["num_enemigos_abatidos"]);
								$historialTO->setTiempoSegundosAlcanzado($data["tiempo_segundos_alcanzado"]);
								$historialTO->setNumItemsCapturados($data["num_items_capturados"]);
								$historialTO->setUsuarioID($usuarioTO->getID());

								$historialDAO->insertarHistorial($historialTO); 
				 				//insert into database.
							}else{
								$response["msg"]="usuarioTO is undefined"; 
							}
						}else{
							$response["msg"]="invalid session"; 
							$response["result"] = "user_undefined";  
						}
					}else{
						$response["msg"]="access token is empty"; 
					}
					

				} catch(Facebook\Exceptions\FacebookResponseException $e) {
					$response["result"]="FacebookResponseException";
					$response["msg"]=$e->getMessage(); 
					//return 'Graph returned an error: ' . $e->getMessage(); 
				} catch(Facebook\Exceptions\FacebookSDKException $e) {
					$response["result"]="FacebookSDKException";
					$response["msg"]=$e->getMessage(); 
					//return 'Facebook SDK returned an error: ' . $e->getMessage(); 
				}	
			}else{
				$response["msg"]="sizeof data is 0"; 
			}
			
			return $response;
		}
		public function getInfo($from){
			$response["result"]="none"; 
			if($from=="history"){
				require_once "classes/Facebook/autoload.php";
				$this->facebook = new Facebook\Facebook(
					array(
						'app_id' => 'xxxxxxxx',
						'app_secret' => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
						'default_graph_version' => 'v2.2' 
					)
				); 
				try { 
					$access_token = array_key_exists("facebookToken",$_SESSION) ? $_SESSION["facebookToken"] : "";
					if($access_token!=""){
						// Returns a `Facebook\FacebookResponse` object
						//first_name,last_name,middle_name,name_format,gender,email,currency
						$resp = $this->facebook->get('/me?fields=id', $access_token);
						$info = $resp->getGraphUser();  
						if($info->getId()==$_SESSION["facebookID"]){ 
							$response["result"] = "ok";   
							//----------------------------------------------
							$daoFactory = DAOFactory::getInstance();
							$usuarioDAO = $daoFactory->getUsuarioDAO(); 
							$usuarioTO = $usuarioDAO->datoUsuarioPorFacebookID($info->getId());
							if($usuarioTO){

								$historiales = $usuarioDAO->listaHistorialesDeUsuario($usuarioTO->getID());
								$response["result"]="ok"; 
								if(is_array($historiales)){
									$_arr = array();
									foreach($historiales AS $key=>$value){ 
										$_arr[] = $value->toArray();
									}
									$response["data"]=json_encode($_arr); 
								}
								
								
							}else{
								$response["msg"]="usuarioTO undefined"; 
							}
							
						}else{
							$response["msg"]="invalid session"; 
						}
					}else{
						$response["msg"]="access token is empty"; 
					}
					

				} catch(Facebook\Exceptions\FacebookResponseException $e) {
					$response["result"]="FacebookResponseException";
					$response["msg"]=$e->getMessage(); 
					//return 'Graph returned an error: ' . $e->getMessage(); 
				} catch(Facebook\Exceptions\FacebookSDKException $e) {
					$response["result"]="FacebookSDKException";
					$response["msg"]=$e->getMessage(); 
					//return 'Facebook SDK returned an error: ' . $e->getMessage(); 
				}	
			}else{
				$response["msg"]="sizeof data is 0"; 
			}
			
			return $response;
		}
		public function authenticate($data){
			$response["result"]="none";
			require_once "classes/Facebook/autoload.php";
			$this->facebook = new Facebook\Facebook(
				array(
					'app_id' => '1267664723354750',
					'app_secret' => 'fb33dbb9e65a6f8a39bbd11003173e12',
					'default_graph_version' => 'v2.2' 
				)
			); 
			try {
				$access_token = $data["access_token"];
				// Returns a `Facebook\FacebookResponse` object
				//first_name,last_name,middle_name,name_format,gender,email,currency
				$resp = $this->facebook->get('/me?fields=id,first_name,last_name,email,gender', $access_token);
				$info = $resp->getGraphUser();  
				$content = $info->asArray(); 
				$response["result"] = "ok";  
				$_SESSION["facebookToken"] = $access_token;
				$_SESSION["facebookID"] = $content["id"]; 
				//----------------------------------------------
				$daoFactory = DAOFactory::getInstance();
				$usuarioDAO = $daoFactory->getUsuarioDAO();
				$usuarioTO = new UsuarioTO();
				$usuarioTO->setNombres($content["first_name"]);
				$usuarioTO->setApellidos($content["last_name"]);
				$usuarioTO->setEmail($content["email"]);
				$usuarioTO->setFacebookID($content["id"]);

				$usuarioDAO->insertarUsuario($usuarioTO); 
 				//insert into database.

			} catch(Facebook\Exceptions\FacebookResponseException $e) {
				$response["result"]="FacebookResponseException";
				$response["msg"]=$e->getMessage(); 
				//return 'Graph returned an error: ' . $e->getMessage(); 
			} catch(Facebook\Exceptions\FacebookSDKException $e) {
				$response["result"]="FacebookSDKException";
				$response["msg"]=$e->getMessage(); 
				//return 'Facebook SDK returned an error: ' . $e->getMessage(); 
			}	
			return $response;
		}
		function __destruct(){
			
		}
	}
?>
