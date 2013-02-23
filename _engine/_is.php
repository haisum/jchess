<?php

			$db = new db(DB_HOST, DB_USER, DB_PASS, DB_NAME);			
			$qury = "update `players` set lastSeen = NOW() where id = '" . $_SESSION['id'] . "'";			
			
			$qury = $db -> query($qury);				
			
			
			$sql = "select * from messages where isRead = 0 and recipient = '" . $_SESSION['alias'] . "'";
			
			$unreadMesages = mysql_query($sql);
			
			if (mysql_num_rows($unreadMesages) > 0)
			{
				echo "1";									
					$msngr = new messenger;
					$msngr -> markALlRead();	
			}						
?>