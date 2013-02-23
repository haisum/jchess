<?php

	// signup code
		if ((isset($_POST['signup_email'])) && (strlen(trim($_POST['signup_email'])) > 0)) 
			$signup_email= stripslashes(strip_tags($_POST['signup_email']));	
		

		if ((isset($_POST['signup_alias'])) && (strlen(trim($_POST['signup_alias'])) > 0)) 
			$signup_alias= stripslashes(strip_tags($_POST['signup_alias']));
		
		if ( isset ($signup_email) && isset ($signup_alias) )			
			$newPlayer = player::signUp($signup_email, $signup_alias);
			
	// sign in
		if ((isset($_POST['login_alias'])) && (strlen(trim($_POST['login_alias'])) > 0)) 
			$login_alias= stripslashes(strip_tags($_POST['login_alias']));		
	
		if ((isset($_POST['login_password'])) && (strlen(trim($_POST['login_password'])) > 0)) 
			$login_password= stripslashes(strip_tags($_POST['login_password']));					
		
		if ( isset ($login_alias) && isset ($login_password) )			
		{
			$Player = player::signIn($login_alias, $login_password);			
			//echo $login_password;
		}			

	// end sign in


	
			
?>
