<?php


if ( !(isset($_GET['msg']) && isset($_GET['rid'])) )
{
	echo("No reciepent specified!");
	exit();
}
{
	$msngr = new messenger;
	$msngr -> sendMsg($_GET['rid'], $_GET['msg']);
}

?>