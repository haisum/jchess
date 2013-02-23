<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" lang="en"><head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <meta http-equiv="X-UA-Compatible" content="IE=7">
	<title><?php echo APP_NAME;//$_html_title ?></title>
    <meta name="description" content="<?php echo APP_DESC; ?>">
    <meta name="keywords" content="<?php echo ''; ?>">    
    <link rel="shortcut icon" href="<?php echo APP_URL; ?>favicon.ico">
    <link href="<?php echo APP_URL; ?>_templates/default/main.css" rel="stylesheet" type="text/css">	
	<link media="screen" rel="stylesheet" href="<?php echo APP_URL; ?>_templates/default/colorbox.css" />
	<link media="screen" rel="stylesheet" href="<?php echo APP_URL; ?>_templates/default/main.css" />
	<link media="screen" rel="stylesheet" href="<?php echo APP_URL; ?>_templates/default/chat.css" />
	<link media="screen" rel="stylesheet" href="<?php echo APP_URL; ?>_templates/default/colorpicker.css" />	
	<link media="screen" rel="stylesheet" href="<?php echo APP_URL; ?>_templates/default/chessboard.css" />	
	<script type="text/javascript">
		var APP_URL = "<?php echo APP_URL; ?>";
		var gameID = 0;
		var player = <?php if(isset($_session['id'])) echo $_session['id']; else echo '1'; ?>;
		var lastMove = "NoMOVE";
		var playerSide = "";
		var isTimemrStarted = 0;
	</script>		
	<script src="<?php echo APP_URL; ?>js/jquery.js" type="text/javascript"></script>	
	<script src="<?php echo APP_URL; ?>js/jquery-ui-1.8.5.custom.min.js" type="text/javascript"></script>
	<script src= "<?php echo APP_URL; ?>js/jquery.colorbox.js"></script>	
	<script src= "<?php echo APP_URL; ?>js/colorpicker.js"></script>		
	<script type="text/javascript" src="<?php echo APP_URL; ?>js/chat.js"></script>	
	<script src="<?php echo APP_URL; ?>js/timer.min.js" type="text/javascript"></script>
		<script type="text/javascript">			
			var timer = $.timerCreate({
				delay: 1000,
				interval: 1000,
				callback: function(timer, args){
					setTimers(timer, args);
				},
				repeat : true
			});
		</script>
	<script src="<?php echo APP_URL; ?>js/engine.js" type="text/javascript"></script>		
	<script src="<?php echo APP_URL; ?>js/script.js" type="text/javascript"></script>
	<script src= "<?php echo APP_URL; ?>js/refreshActivity.js"></script>
</head><body>	
<div id="main-container">