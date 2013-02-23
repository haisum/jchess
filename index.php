<?php
	// config
	if(!file_exists('_config/config.php')) 
	   die('[index.php] _config/config.php not found');	  
	require_once '_config/config.php';

	$_html_title = APP_NAME;
	$_meta_description = APP_DESC;
	$_meta_keywords = '';		
			
			
		
			
	switch($page)
	{

		case 'resigned':
		   require 'page__header.php';		   
		   if(isset($_SESSION['id']))			
				require 'page_home.php';
			else
				require 'page_login.php';			
			echo "<script type='text/javascript'>$(document).ready(function() {	 userMessageShow('Game resigned!');  } );</script>";
		   require 'page__footer.php';			
			
			break;
		   
		case 'profile';							
		   require 'page_profile.php';
		   break;		 
		   
		   
		case 'play':	
		   require 'page_play_back.php';		   
		   require 'page__header.php';		   
		   if(isset($_SESSION['id']))			
				require 'page_play.php';
			else
			{
				echo "<script type='text/javascript'>$(document).ready(function() {	 userMessageShow('Please login first!');  } );</script>";
				require 'page_login.php';			
			}
		   require 'page__footer.php';	
		   break;

			
		case 'player':
			if($id=="activation")
			{
				require 'page__header.php';					
				require 'page_login.php';
				require 'page_player.php';
				require 'page__footer.php';						  							
			}
			else
			{			
				require 'page__header.php';	
				require 'page_player.php';					   
				require 'page__footer.php';						  							
			}
			break;
			
		case 'mobile':
			require 'page_mobile.php';
			break;
			
		case 'loader':		   
		    require 'page_loader.php';
			break;				
		
		// 404 etc. error page
		case 'page-unavailable':						
			break;			
			
		case 'signout':
			session_destroy();
			header('Location: ' . APP_URL);
			break;
			
		default: 		
		   require 'page__header.php';		   
		   if(isset($_SESSION['id']))			
				require 'page_home.php';
			else
				require 'page_login.php';			
		   require 'page__footer.php';	
		   break;
	}
		
	echo $page . $id . $extra;	
?>

<script type="text/javascript">
function getURL()
{
	return "<?php echo APP_URL; ?>";	
}
</script>