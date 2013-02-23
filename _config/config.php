<?php
/**
 * Config - 
 * @author     Muhammad Ahmed <http://www.ehmad11.com> <ehmad1@gmail.com>
*/
  
	define('APP_PATH', str_replace(DIRECTORY_SEPARATOR.DIRECTORY_SEPARATOR, DIRECTORY_SEPARATOR, str_replace('_config', '', dirname(__FILE__)) . DIRECTORY_SEPARATOR));	
	if(isset($_SERVER['SCRIPT_NAME'])) 
	{
		$app_main_dir = rtrim(dirname($_SERVER['SCRIPT_NAME']),'/\\');	
		define('_APP_MAIN_DIR', $app_main_dir);
  	} 
	else 
		die('[config.php] Cannot determine APP_MAIN_DIR, please set manual and comment this line');

	// Environments setup
	require_once APP_PATH . '_config/config.envs.php';	
	
	
	// Function and classes includes
	require_once APP_PATH . '_includes/class.db.php';	
	
	
	// Establish database connection
	try 
	{
			$db = new db(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	}
	catch(ConnectException $exception) 
	{
			echo "Database Connection Error:<br />";
			exit();
	}	
		
	require APP_PATH . '_includes/class.player.php';
	require APP_PATH . '_includes/class.players.php';
	require APP_PATH . '_includes/function.password.php';
	require APP_PATH . '_includes/function.validate_email.php';	
	require APP_PATH . '_includes/function.mail.php';	
	require APP_PATH . '_includes/class.messenger.php';		
	require APP_PATH . '_includes/class.phpmailer.php';
	require APP_PATH . '_includes/class.game.php';
	
	
	// Split URL - get parameters
	$_app_info['params'] = array();	
	if (isset($_SERVER['HTTP_X_ORIGINAL_URL']))
		$_SERVER['REQUEST_URI'] = $_SERVER['HTTP_X_ORIGINAL_URL'];
		
	if (isset($_SERVER['HTTP_X_REWRITE_URL']))
		$_SERVER['REQUEST_URI'] = $_SERVER['HTTP_X_REWRITE_URL'];
		
	// if server is Apache:	
	if(REWRITE_MODE == 'apache_mod_rewrite' || REWRITE_MODE == 'iis_isapi_rewrite')
	{
		$newUrl = str_replace('/', '\/', _APP_MAIN_DIR);
	    $pattern = '/'.$newUrl.'/';   
	    $_url = preg_replace($pattern, '', $_SERVER['REQUEST_URI'], 1);
		$_tmp = explode('?', $_url);
		$_url = $_tmp[0];	
		
		if ($_url = explode('/', $_url))
		{
			foreach ($_url as $tag)
			{
				if ($tag)
					$_app_info['params'][] = $tag;			
			}
		}
	}
	elseif(REWRITE_MODE == 'iis_url_rewrite')
	{
		if(isset($_GET['page']))
			$_app_info['params'][]  = $_GET['page'];
		if(isset($_GET['id']))
			$_app_info['params'][]  = $_GET['id'];
		if(isset($_GET['extra']))
			$_app_info['params'][]  = $_GET['extra'];
	}
	
	$page = (isset($_app_info['params'][0]) ? mysql_real_escape_string($_app_info['params'][0]) : '');
	$id = (isset($_app_info['params'][1]) ? mysql_real_escape_string($_app_info['params'][1]) : 0);
	$extra = (isset($_app_info['params'][2]) ? mysql_real_escape_string($_app_info['params'][2]) : '');

	header('Content-Type: text/html; charset=UTF-8');
	session_start();
?>