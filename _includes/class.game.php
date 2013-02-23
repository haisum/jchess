<?php
	class game
	{
	
		function __construct()		
		{
					
		}
		public function create()
		{						
			try
			{
				global $db;			
				$sql = sprintf("insert into games (whitePlayer, status) values (%s, 0) ",  $_SESSION['id']);
				$db -> query($sql);
			}
			catch(QueryException $ex)
			{
				echo "Error: creating new game";				
			}											
		}	

		
		public function reject($gameID)
		{			
			try
			{
				global $db;			
				$sql = sprintf("update games set status = -1 where gameID = %s",  $gameID);				
				$db -> query($sql);
				echo "Game rejected!";
			}
			catch(QueryException $ex)
			{
				echo "Error: Rejecting game";
			}											
		}


		

		public function joinGame($gameID, $playerID)
		{			
			try
			{
				global $db;			
				$sql = sprintf("update games set blackPlayer = %s, status = 1 where gameID = %s",  $playerID, $gameID);
				$db -> query($sql);
				echo "Game rejected!";
			}
			catch(QueryException $ex)
			{
				echo "Error: Joining game";
			}											
		}		




		public function getGame($gameID)
		{						
			try
			{
				global $db;			
				$sql = sprintf("select * from  games where gameID = %s", $gameID);
				return $db -> QueryArray($sql);				
			}
			catch(QueryException $ex)
			{
				echo "Error: creating new game";				
			}											
		}	






		public function resign($gameID)
		{						
			try
			{
				global $db;			
				$sql = sprintf("update games set status = 2 where gameID = %s",  $gameID);	
				$db -> Query($sql);				
			}
			catch(QueryException $ex)
			{
				echo "Error: Resigning game";				
			}											
		}	





		public function timeoutPlayer($gameID)
		{			
		$winner = "";
			try
			{
				global $db;	

				$sql = sprintf("select * from  games where gameID = %s", $gameID);				
				$gamerow = $db -> QueryRow($sql);	
				
				if($_SESSION['id'] == $gamerow['whitePlayer'])
					$winner = $gamerow['blackPlayer'];
				else
					$winner = $gamerow['whitePlayer'];
					
				
				$sql = sprintf("update games set status = 3, winner = %s where gameID = %s",  $winner, $gameID);	
				echo $sql;
				$db -> Query($sql);				
			}
			catch(QueryException $ex)
			{
				echo "Error: Resigning game";				
			}											
		}	




		

		
		public function getMoves($gameID)
		{								
			try
			{
				global $db;
				$sql = sprintf("select * from game_moves where gameID = %s",  $gameID);	
				return $db -> QueryArray($sql);
			}
			catch(QueryException $ex)
			{
				echo "Error: gettings move";
			}											
		}	


		

		public function recordMove($gameID, $player, $from, $to)
		{						
			try
			{
				global $db;			
				$sql = sprintf("insert into game_moves (gameID, player, fromColumn, toColumn) values (%s, %s, '%s', '%s')",  $gameID, $player, $from, $to);	
				//echo $sql;
				$db -> Query($sql);				
			}
			catch(QueryException $ex)
			{
				echo "Error: record move";
			}											
		}	
		
		
		public function getWinner($gameID)
		{						
			try
			{
				global $db;			
				$sql = sprintf("select * from players where id = %s ",  $gameID);	
				return $db -> Query($sql);				
			}
			catch(QueryException $ex)
			{
				//echo "Error: Resigning game";				
			}											
		}
				
	}			
?>