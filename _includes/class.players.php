<?php
	class players
	{			
		function __construct(){}
		
		public function getAllPlayers(){		
			global $db;
			$sql = "select * from players";	
			return $db->QueryArray($sql);				
		}
		
		
		public function getAvailaibleOnlinePlayers(){

			global $db;
			$sql = "select * from players WHERE alias <> '" . $_SESSION['alias'] . "' and lastSeen > DATE_SUB(NOW(), interval 1 MINUTE)";		
			//echo $sql;
			//echo $sql;			
			return $db->QueryArray($sql);										
		}

		public function getPlayer($alias){

			global $db;
			$sql = "select * from players where alias = '"  . $alias . "'";	
			$arry =  $db->QueryArray($sql);		
			return $arry;
		}
		
	}
?>