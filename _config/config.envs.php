<?php
	//setup instance
	switch($_SERVER['HTTP_HOST'])
	{

		case 'localhost':	
				define('DB_HOST', 'localhost');
				define('DB_PORT', 3306);
				define('DB_USER', 'root');
				define('DB_PASS', '');
				define('DB_NAME', 'chess');
				define('DB_PREFIX', '');						
				define('REWRITE_MODE', 'apache_mod_rewrite'); // iis_isapi_rewrite, iis_url_rewrite, apache_mod_rewrite		
				ini_set('error_reporting', E_ALL);        // error reporting
				ini_set('display_errors', 'On');	  	 // error reporting
				
				define('APP_URL', 'http://localhost/chess/'); 
				define('APP_NAME', 'jCHESS');
				define('APP_DESC', 'Academic Project by Haisum');
				define('APP_KEYWORDS', 'Chess');
				define('APP_COPYRIGHT', 'Software Engineering Academic Project');			
				
				define('APP_EMAIL', 'haisumbhatti@gmail.com');
			break;


		case 'haisum.info':
				define('DB_HOST', 'localhost');
				define('DB_PORT', 3306);
				define('DB_USER', 'someuser');
				define('DB_PASS', 'somepass');
				define('DB_NAME', 'somedbname');
				define('DB_PREFIX', '');						
				define('REWRITE_MODE', 'apache_mod_rewrite'); // iis_isapi_rewrite, iis_url_rewrite, apache_mod_rewrite		
				ini_set('error_reporting', NULL);        // error reporting
				ini_set('display_errors', 'Off');	  	 // error reporting
				
				define('APP_URL', 'http://haisum.info/chess/'); 
				define('APP_NAME', 'jCHESS');
				define('APP_DESC', 'Academic Project by Haisum');
				define('APP_KEYWORDS', 'Chess');
				define('APP_COPYRIGHT', 'Software Engineering Academic Project');			
				
				define('APP_EMAIL', 'haisumbhatti@gmail.com');
			break;			
		
		
					
		default:
			die("Chess game not yet configured! visit <a href='http://haisum.info/chess'> the project website </a> to know how!");
	}		
				
				
		// not used yet
		define('APP_TEMPLATE', 'default');		
?>