
<?php
$gameStatus = 100;
$playerSide = "1";


if(isset($gameDetails) &&  count($gameDetails) == 1 )
{
	print_r($gameDetails);


	$gameDetails = $gameDetails[0];
	
	$gameStatus = $gameDetails['status'];
	
	
if($gameDetails['whitePlayer'] == $_SESSION['id'])
	$playerSide = "white";
else
{
	$playerSide = "black";
	if($gameDetails['blackPlayer'] == "0")
	{
		echo "<script type='text/javascript'>$(document).ready(function() {	 userMessageShow('Game joined!');  } );</script>";			
		$game -> joinGame($id, $_SESSION['id']);
	}
	
	
	if($gameDetails['winner'] != "0" && $gameDetails['winner'] != $_SESSION['id'])
	{
		echo "<script type='text/javascript'>$(document).ready(function() {	 userMessageShow('You lost the game. ');  } );</script>";			
	}
}	

	
	
}
else
{
	echo "<script type='text/javascript'>$(document).ready(function() {	 userMessageShow('No such game exists!!');  } );</script>";
}

?>   
   <script type="text/javascript">

   
		
    	name = '<?php echo $_SESSION['alias']; ?>';	
		gameID = '<?php echo $id; ?>';		
		playerSide = '<?php echo $playerSide ?>';	
		gameStatus = '<?php echo $gameStatus ?>';	
		
		//alert(gameID +  " side:" + playerSide);
		
		gameID = "<?php echo $id; ?>";		        	    	
					

		
        var chat =  new Chat();// kick off chat
    	$(function() {    	
    		 chat.getState();     		 
            $("#sendie").keydown(function(event) {               
                 var key = event.which;           
                 if (key >= 33) {
                   
                     var maxLength = $(this).attr("maxlength");  
                     var length = this.value.length;  
                     
                     if (length >= maxLength) {  
                         event.preventDefault();  
                     }  
                  }  
			});
    		 $('#sendie').keyup(function(e) {	    		 					 
    			  if (e.keyCode == 13) {     			  
                    var text = $(this).val();
    				var maxLength = $(this).attr("maxlength");  
                    var length = text.length;                      
                    // send 
                    if (length <= maxLength + 1) {                      
    			        chat.send(text, name);	
    			        $(this).val("");    			        
                    } else {                    
    					$(this).val(text.substring(0, maxLength));    					
    				}	    			    			
    			  }
             });           		
    	});
    </script>
	
    <div id="content" class="clearfix">        
			<div id="page">
						
			<?php include "page__top_menu.php" ?>				

            <div id='leftColumn'>
                <div id='colorpicker' title='Change Color'></div>
                <div class='flip' title='Flip Board' id='flip' onclick='flipTheBoard();'></div>
				
			<p id="name-area" ></p>        
			<div id="chat-wrap"class='chat'>
				<div id="chat-area" class='chatTalk'></div>
			</div>
			
			<form id="send-message-area">
				<textarea id="sendie" maxlength = '100' class='chatInput'></textarea>
			</form>				
				<!--
                <div class='chat'>
                    <ul class='chatTalk'>
                        <li class='white'>Hey how are you</li>
                        <li class='black'>Cocentrate on game you fool</li>
                    </ul>
                    <form action='javascript:;' method='POST'>
                        <input type='text' placeholder='Talk in chat' class='chatInput'></input>
                    </form>
                </div>
				-->
				
            </div>
            <div class='wrapper'>
                <div id='1'>
                    <div id='h1' class='A chess_piece rook black Column' piece='rook' color='black'></div>
                    <div id='g1' class='B chess_piece knight black Column' piece='knight' color='black'></div>
                    <div id='f1' class='C chess_piece bishop black Column' piece='bishop' color='black'></div>
                    <div id='e1' class='D chess_piece king black Column' piece='king' color='black'></div>
                    <div id='d1' class='E chess_piece queen black Column' piece='queen' color='black'></div>
                    <div id='c1' class='F chess_piece bishop black Column' piece='bishop' color='black'></div>
                    <div id='b1' class='G chess_piece knight black Column' piece='knight' color='black'></div>
                    <div id='a1' class='H chess_piece rook black Column' piece='rook' color='black'></div>
                </div>
                <div id='2'>
                    <div id='h2' class='A chess_piece pawn black Column' piece='pawn' color='black'></div>
                    <div id='g2' class='B chess_piece pawn black Column' piece='pawn' color='black'></div>
                    <div id='f2' class='C chess_piece pawn black Column' piece='pawn' color='black'></div>
                    <div id='e2' class='D chess_piece pawn black Column' piece='pawn' color='black'></div>
                    <div id='d2' class='E chess_piece pawn black Column' piece='pawn' color='black'></div>
                    <div id='c2' class='F chess_piece pawn black Column' piece='pawn' color='black'></div>
                    <div id='b2' class='G chess_piece pawn black Column' piece='pawn' color='black'></div>
                    <div id='a2' class='H chess_piece pawn black Column' piece='pawn' color='black'></div>
                </div>
                <div id='3'>
                    <div id='h3' class='A'></div>
                    <div id='g3' class='B'></div>
                    <div id='f3' class='C'></div>
                    <div id='e3' class='D'></div>
                    <div id='d3' class='E'></div>
                    <div id='c3' class='F'></div>
                    <div id='b3' class='G'></div>
                    <div id='a3' class='H'></div>
                </div>
                <div id='4'>
                    <div id='h4' class='A'></div>
                    <div id='g4' class='B'></div>
                    <div id='f4' class='C'></div>
                    <div id='e4' class='D'></div>
                    <div id='d4' class='E'></div>
                    <div id='c4' class='F'></div>
                    <div id='b4' class='G'></div>
                    <div id='a4' class='H'></div>
                </div>
                <div id='5'>
                    <div id='h5' class='A'></div>
                    <div id='g5' class='B'></div>
                    <div id='f5' class='C'></div>
                    <div id='e5' class='D'></div>
                    <div id='d5' class='E'></div>
                    <div id='c5' class='F'></div>
                    <div id='b5' class='G '></div>
                    <div id='a5' class='H'></div>
                </div>
                <div id='6'>
                    <div id='h6' class='A'></div>
                    <div id='g6' class='B'></div>
                    <div id='f6' class='C'></div>
                    <div id='e6' class='D'></div>
                    <div id='d6' class='E'></div>
                    <div id='c6' class='F'></div>
                    <div id='b6' class='G'></div>
                    <div id='a6' class='H'></div>
                </div>
                <div id='7'>
                    <div id='h7' class='A chess_piece pawn white Column'  piece='pawn' color='white'></div>
                    <div id='g7' class='B chess_piece pawn white Column'  piece='pawn' color='white'></div>
                    <div id='f7' class='C chess_piece pawn white Column'  piece='pawn' color='white'></div>
                    <div id='e7' class='D chess_piece pawn white Column'  piece='pawn' color='white'></div>
                    <div id='d7' class='E chess_piece pawn white Column'  piece='pawn' color='white'></div>
                    <div id='c7' class='F chess_piece pawn white Column'  piece='pawn' color='white'></div>
                    <div id='b7' class='G chess_piece pawn white Column'  piece='pawn' color='white'></div>
                    <div id='a7' class='H chess_piece pawn white Column'  piece='pawn' color='white'></div>
                </div>
                <div id='8'>
                    <div id='h8' class='A chess_piece rook white Column'  piece='rook' color='white'></div>
                    <div id='g8' class='B chess_piece knight white Column'  piece='knight' color='white'></div>
                    <div id='f8' class='C chess_piece bishop white Column'  piece='bishop' color='white'></div>
                    <div id='e8' class='D chess_piece king white Column'  piece='king' color='white'></div>
                    <div id='d8' class='E chess_piece queen white Column'  piece='queen' color='white'></div>
                    <div id='c8' class='F chess_piece bishop white Column'  piece='bishop' color='white'></div>
                    <div id='b8' class='G chess_piece knight white Column'  piece='knight' color='white'></div>
                    <div id='a8' class='H chess_piece rook white Column'  piece='rook' color='white'></div>
                </div>
            </div>
            <div class='numberMarks'></div>
            <div id='rightColumn'>

                <div class='graveyard'  id='blackGraveyard' title='Black Dead Pieces'>
                </div>

                <div class='messageDiv'>
                    <div class='clock clock_black'>
                         00:00
                    </div>
                    <div class='table finished '>
                        <div class='opponent' id="systemMessage">Game Started</div>
                        <div class='separator'></div>
                        <div class='current_player' style="z-index: 0 ">
                            <div class='player white'>
                                <div id="statusPiece" class='status chess_piece king white'></div>
                                <p id ="statusMessage">
                                    WHITE moves
                                </p>
                            </div>
                        </div>
                    </div>
					    <div class='control' style="z-index: 1000; border-bottom:1px solid #DDDDDD; font-size:14px;" >
                            <a href='<?php echo APP_URL ?>' title='New Game'>New Game</a>
                            | <a href="<?php echo APP_URL . 'play/' . $id ?>?resign" title='Resign'>Resign</a>
                        </div>

						
                    <div class='clock clock_white'>
                        00:00
                    </div>
                </div>

                <div class='graveyard' id='whiteGraveyard' title='White Dead Pieces'>

                </div>

            </div>
			
            <div class='alphaMarks'></div>
			
			<!--
            <div id='footer'>
            </div>
			-->
			
        <div id='hiddenHelper' id='c' class='Column'></div>        
        <div style="display:none;">
            <div id='box' style='cursor:pointer;margin-left: 4px;'></div>
        </div>
		
		
		<!-- end --> 
			</div>
			<br class="clear">
    </div>



	<div id ="etc"> </div>

