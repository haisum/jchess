// refresh activity
invitation = 0;
window.setInterval(function() {
	var _URL_ENGINE = "" +APP_URL + "_engine/";
	//alert(_URL_ENGINE);
	
	$.ajax({	  
	  url: _URL_ENGINE + "?m=is",
	  success: function(data) {
	  if(data == '1') // new message invitation
		{
			showMessages();
			//userMessageShow(data);

		}
	  }
	});	


	if ($("#listPlayersOnline")){    
			 $.ajax({
			  type: "post",
			  url: _URL_ENGINE + "?m=listOnlinePlayers",
			   beforeSend:function(request){ },
					success: function (html) { 
						$("#listPlayersOnline").html(html);
					}    
			 });
	}
		

	if ($("#chat-wrap")){    
			
			
			
			uri = _URL_ENGINE + "?m=gameStatus&gameID=" + gameID;
			
			 $.ajax({
			  type: "post",
			  url: uri,
			   beforeSend:function(request){ },
					success: function (html) { 						
						gameStatus = html;
						
						switch(html)
						{
							case '1':								
									
									if(isTimemrStarted != 1)
									{
										timer.start();
										isTimemrStarted = 1;
									}
									
								break;											
						
							case '2':
								userMessageShow("Other player resigned! <a href='" + APP_URL + "'>Start New Game</a>");
								break;											
							case '3':
								//window.location = window.location;
								userMessageShow("Timeout!");
								break;	
						
							
						}
						
						//$("#etc").html(html);
					}    
			 });



			 
			 

			uri = _URL_ENGINE + "?m=recordMoves&getMoves=1&gameID=" + gameID;
			
			 $.ajax({
			  type: "post",
			  url: uri,
			   beforeSend:function(request){ },
					success: function (html) {	

						
						if(lastMove != html)
						{
							lastMove = html;
							moves = lastMove.split(' ');
							
							if(lastMove != "NoMOVE")
							{
								move($('#' + moves[0]) , $('#' + moves[1]));	
							}
    //$('#statusPiece').removeClass(getOtherColor(playerColor)).addClass(playerColor);
    //$('#statusMessage').html( playerColor.toUpperCase() + ' moves');
    //$('#systemMessage').html( getOtherColor(playerColor).toUpperCase() + ' waiting');							
						}
							
						//$("#etc").html(lastMove);
						
					}    
			 });
			 

			 
			try
			  {
				chat.update();
			  }
			catch(err)
			  {
				
			  }

	}
	
}, 2000);
function getOtherColor(currentColor){
	if(currentColor == "white")
	return 'black';
	else
	return 'white';
}
