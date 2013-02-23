<?php
if(!isset($id))
	$id = 0;
	
$game = new game();
if(isset($_GET['r'] ))
{	
	$game -> reject($_GET['r']);
	exit();
	//header('Location: ' . APP_URL);
}





if(isset($_GET['resign'] ) && $id > 0)
{	
	$game -> resign($id);		
	header('Location: ' . APP_URL . "resigned");
}




if($id > 0)
{
	$gameDetails = $game -> getGame($id);
	
}
else
{
	$game -> create();
	
	if(isset($_GET['i'] ))
	{
?>
	<script src="<?php echo APP_URL; ?>js/jquery.js" type="text/javascript"></script>	
	<script src="<?php echo APP_URL; ?>js/jquery-ui-1.8.5.custom.min.js" type="text/javascript"></script>
	<script src= "<?php echo APP_URL; ?>js/jquery.colorbox.js"></script>		
<?php
		$msngr = new messenger;
		$msg = "You are invited for a game by " . $_SESSION['alias'] . "(" . $_SESSION['points'] . ")";
		$lid = mysql_insert_id();
		$msg .= "<br> <a href='" . APP_URL . "play/" . $lid . "'> Accept invitaion </a> | <a class='rejectGameLink' href='javascript:rejectgame(" . $lid . ")'> Cancel </a>" ;
		$msngr -> sendMsg($_GET['i'], addslashes( $msg ) );	
		//header( APP_URL . "play/" . mysql_insert_id() ) ;		
		echo "<script type='text/javascript'>$(document).ready(function() {	 userMessageShow('Creating game ...'); setTimeout(function() {  window.location=' " . APP_URL . "play/" . $lid  . "'; }, 4000);   } );</script>";

	}	
}

?>
