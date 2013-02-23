<?php

if(isset($_GET['gameID']))
{
	$game = new game();
	$gameDetails = $game -> getGame($_GET['gameID']);
	
	if(isset($gameDetails) &&  count($gameDetails) == 1 )
	{
		$gameDetails = $gameDetails[0];
		echo $gameDetails['status'];
	}	
}
?>