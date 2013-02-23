<?php



$game = new game();

if (isset($_GET['gameID']))
	$game -> timeoutPlayer($_GET['gameID']);

?>