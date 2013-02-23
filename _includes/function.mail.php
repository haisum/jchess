<?php

	function sendMail($email, $message) {
	
		
		/*
		$emailFrom = APP_EMAIL;
		$subject = APP_NAME;	
		$messageMail = $message;
		$messageMail .= "<br/><br/> -- <a href='" . APP_PATH . "'> " . APP_NAME . "</a>";
		
		$headers = "From: $emailFrom \r\n";
		$headers .= "Content-Type: text/html; charset=iso-8859-1\n"; 
		$result = @mail($email,APP_NAME,$messageMail,$headers); 		
		*/
		
		
		
		$message .= "<br/><br/> -- <a href='" . APP_URL . "'> " . APP_NAME . "</a>";
		
			$mail = new PHPMailer();
			$mail->Mailer = "smtp";
			$mail->Port = 465;
			$mail->IsSMTP(); // telling the class to use SMTP
			$mail->SMTPSecure = "ssl";
			$mail->Host = "smtp.gmail.com"; // SMTP server
			$mail->SMTPAuth = true; // turn on SMTP authentication
			$mail->SMTPKeepAlive = true;

			$mail-> CharSet = 'UTF-8';
			$mail-> ContentType = 'text/html';
			

			$mail->Username = "chess@ehmad11.com";
			$mail->Password = "chesser1!"; // SMTP password

			$mail->From = "chess@ehmad11.com"; //Aparently must be the same as the UserName
			$mail->FromName = "Muhammad Ahmed";
			$mail->Subject = APP_NAME; //‘The subject’;
			$mail->Body = $message;

			$mail->AddAddress($email); 
			
			if(!$mail->Send())
			{
			  //echo "There was an error sending the message: <br/>" . $mail->ErrorInfo;
			  exit;
			}			

	}
?>