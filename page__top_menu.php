
				<div id="logoLeft">				
					<a href="<?php echo APP_URL; ?>"><img id="logo" src="<?php echo APP_URL; ?>_templates/<?php echo APP_TEMPLATE ?>/logo_thumb.png" alt="<?php echo APP_NAME; ?>"></a>			
				</div>
				<div id="topLinks">
					<a href="javascript:showProfile('<?php echo $_SESSION['alias']; ?>')">	
						<?php echo $_SESSION['alias']; ?>
					</a>					
					(<?php echo $_SESSION['points']; ?>)
					| <a href="javascript:showMessages();" id="archivedMsgs"> Messages </a> 
					| <a href="#changePassword" id="chngPassLink"> Change Password </a> 
					| <a href="<?php echo APP_URL; ?>signout"> Signout </a>
				</div>
				<div style="clear: both;" ></div>

				