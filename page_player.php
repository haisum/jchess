<?php
switch($id)
{
case "activation":
	if(isset($_GET['emailid']) && isset($_GET['code']))
	{
		$player = player::activate($_GET['emailid'], $_GET['code']);
	}
	break;
default:
	break;
}
?>