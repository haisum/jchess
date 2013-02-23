<?php
	class messenger
	{			
		function __construct(){}
		
		
		public function sendMsg($recipientID, $message)
		{		
			if($recipientID == $_SESSION['alias'])
				return;
				
			try{
				global $db;			
				$sql = sprintf("insert into messages (sender, recipient, message) values ('%s', '%s', '%s') ",  $_SESSION['alias'] , $recipientID, $message);								
				$db -> query($sql);
				
				echo "message sent!";
			}
			catch(QueryException $ex)
			{
				echo "Error: sending message..";
			}
			
		}						
		
		
		public function getArchivedMsgs($recipient = 0)
		{						
			if($recipient == 0)
				$recipient = $_SESSION['alias'];
			global $db;			
			$sql = sprintf("select * from messages where recipient = '%s' order by id desc ",  $recipient);
			return $db->QueryArray($sql);										
		}								

		public function markALlRead()
		{						
			global $db;			
			$sql = sprintf("update messages set isRead = 1 where recipient = '%s' ", $_SESSION['alias']);
			return $db->Query($sql);										
		}	
		
	}
?>