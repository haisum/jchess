				<div class="players">
				<?php				
					$players = new players();													
					//$allPlayers = $players-> getAllPlayers();
					$allPlayers = $players-> getAvailaibleOnlinePlayers();						
					if(is_array($allPlayers) &&  count($allPlayers) > 0 ){
						foreach( $allPlayers as $player ) {					
				?>		
						<div class="playerInfo"> 
							<span class="playerName"> 															
									<strong> <?php echo $player['alias'] ?> </strong>								
								
								- <a href="javascript:showProfile('<?php echo $player['alias'] ?>')"> 
									View profile
								   </a>
								   
								- <a href="<?php echo APP_URL ?>play/?i=<?php echo $player['alias'] ?>"> 
									Invite for game
								  </a>

								- <a href="javascript:sendMessage('<?php echo $player['alias'] ?>')"> 
									Send message
								  </a>								  
							</span> 
						<br/> 
						</div>				
				<?php
						}					
					}
				else {
					echo "<br> <i> No players online! </i>";
					exit();
				}
				?>
				</div>