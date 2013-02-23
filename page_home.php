    <div id="content" class="clearfix">        
        <div id="full-content">
			<div id="landing-page">
			
			<?php include "page__top_menu.php" ?>
			
				<br class="clear">
				<h1>
					Welcome !! 
					<?php echo $_SESSION['alias']; ?>
					:D					
				</h1>
				<br class="clear">
								
				
				
				<h2> Online users: </h2>
				<div id="listPlayersOnline"> 					
					<img id="loadng" src="<?php echo APP_URL; ?>/_templates/<?php echo APP_TEMPLATE ?>/images/loading.gif" alt="">
				</div>
				
			</div>
			<br><br>
        </div>
        <br class="clear">
    </div>