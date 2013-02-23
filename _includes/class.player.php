<?php
	class player
	{			
		function __construct(){}
		public static function signUp($email, $alias)
		{		
			if( validate_email($email) && !isset($alias) )
			{
				echo "Invalid email address or alias";
				return false;
			}
			
			$password = createRandomPassword();
						
			global $db;
			$query = sprintf("INSERT INTO players (email, alias, password) VALUES ('%s', '%s', '%s')",  $email,  $alias, $password );

			try
			{
				$query = $db -> query($query);
				
				$passwordEncoded = base64_encode ( $password );
				$msg = "Your account has been created! :D <br/><br/>";
				$msg .= "Login Details: <br/>";
				$msg .= "ID: " . $alias . "<br/>";
				$msg .= "Password: " . $password . "";
				$msg .= "<br/>";
				$msg .= "<a href='" . APP_URL . "player/activation/?code=" . $passwordEncoded . "&emailid=" . $email . "'>  Click here to activate your account </a> ";
								
				//echo $msg ;
				
				sendMail($email, $msg);
				
				echo "You have been succesfully registered, for further instructions please read the email just sent to you :)  ";
			}
			catch(QueryException $ex)
			{
				echo "Sorry, your account cant be created. The alias or email already exists or you have entered invalid values."; 
			}
		}
		
		public static function signIn($alias, $password)
		{					
			global $db;
			$query = sprintf("select * from players where alias = '%s' and password = '%s' and isActive = 1 ",  $alias,  $password);
			$row =  $db -> QueryRow($query);
			
			if($row =  $db -> QueryRow($query) )
			{
				echo "Login Successful :D! you'll be redirected in 3 seconds..";
				echo '<br/> <a href="javascript:location.reload(true)">Proceed</a>';				
				echo "<script type='text/javascript'> setTimeout(function() {  window.location=' " . APP_URL . "'; }, 3000); </script> ";						
			
				$_SESSION['id'] = $row['id'];
				$_SESSION['alias'] = $row['alias'];
				$_SESSION['email'] = $row['email'];
				$_SESSION['password'] = $row['password'];
				$_SESSION['points'] = $row['points'];

			}
			else
				echo "Invalid login! Account not created or is not activated yet!";
		}		


		public static function activate($email, $code)
		{
			global $db;
			$password = base64_decode($code);			
			$query = sprintf("select * from players where email = '%s' and password = '%s' and isActive = 0 ",  $email,  $password);		
			$row =  $db -> QueryRow($query);
			if($row =  $db -> QueryRow($query) )
			{			
				$query2 = sprintf("update players set isActive = 1 where email = '%s' and password = '%s' and isActive = 0 ",  $email,  $password);
				$queryUpdate = $db -> query($query2);											
				echo "<script type='text/javascript'>$(document).ready(function() {	 userMessageShow('Login Successful! Your account has been activated :D. You will be redirected in few seconds..');  } );</script>";
				echo "<script type='text/javascript'> setTimeout(function() {  window.location=' " . APP_URL . "'; }, 7000); </script> ";
				
				$_SESSION['id'] = $row['id'];
				$_SESSION['alias'] = $row['alias'];
				$_SESSION['email'] = $row['email'];
				$_SESSION['password'] = $row['password'];
				$_SESSION['points'] = $row['points'];
			}
			else
				echo "<script type='text/javascript'>$(document).ready(function() {	 userMessageShow('Error: Your account can not be activated.') } );</script>";
		}				
		

		public static function changePassword($newpassword)
		{
			try{
				global $db;
				$query = sprintf("update players set password = '%s' where id = '%s'",  $newpassword, $_SESSION['id']);
				$db -> query($query);				
				$_SESSION['password'] = $newpassword;
				echo "Password updated!";
			}
			
			catch(QueryException $ex)
			{
				echo "Error!"; 
			}

		}						
	}
?>