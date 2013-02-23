<?php

	$msngr = new messenger;	
	$messages = $msngr -> getArchivedMsgs();
	
	if(is_array($messages) ){
		
		$i = 0;
		echo "<div id='archivedmsgs'>";
		foreach( $messages as $message ) {					
			$i++;
			echo "<div id='archivedmsgs-" . $i . "' class='archvedmsg'> <br> <b><i> Message # " . $i . "/" . count($messages) . " - From " . $message['sender'] . ", ";
			echo $message['datetimeSent'] . " </i> </b> <br><br>" . $message['message'] . "</div>";
		}
		echo "</div>";		
		echo "<a href='javascript:showNxtMsg();'> Next </a> | ";
		echo "<a href='javascript:showPrevsMsg();'> Previous </a>";
		echo "<script type='text/javascript'> targetOffset_max = " .  count($messages) . " * 80; </script>";
	}
	else
	echo("No messages!");

					
?>