<?php
	// config
	if(!file_exists('../_config/config.php')) 
	   die('[/engine] config file not found');	  
	require_once '../_config/config.php';
	
	if(isset($_GET['m']))
	{
		$mode = $_GET['m'];
	}
		else
			$mode = '';
		
	
	switch($mode)
	{



		case 'timeout':
			if(isset($_SESSION['id']))	
				require '_timeout.php';
			break;		

			
		case 'gameStatus':
			if(isset($_SESSION['id']))	
				require '_game_status.php';
			break;		


		case 'recordMoves':
			if(isset($_SESSION['id']))	
				require '_game_moves.php';
			break;		

	
		case 'listOnlinePlayers':
			if(isset($_SESSION['id']))	
				require '_players_list_online.php';
			break;	

		case 'archivedMsgs':
			if(isset($_SESSION['id']))	
				require '_messages_archived.php';
			break;	

		case 'chngpass':
			if(isset($_SESSION['id']))	
				require '_password_change.php';
			break;	
						
			
		case 'sendMsg':
			if(isset($_SESSION['id']))	
				require '_send_msg.php';
			break;	
			
		case 'signIn':
		case 'signUp':
		   require '_signInUp.php';
			break;				
		case 'is':
			if(isset($_SESSION['id']))	
				require '_is.php';
			break;
		case 'chat':
			if(isset($_SESSION['id']))	
				require '_chat.php';
			break;
		default: 		
			die("Invalid reuqest!");
			break;
	}	
?>