	//index page code	
	  $(document).ready(function() {			 	  
	  
			var _URL = "" +getURL() + "";
			var _URL_ENGINE = "" +getURL() + "_engine/";

			
			$("#chngPassLink").colorbox({ height:"300px;" ,width:"40%", inline:true, href:"#chngPass"});
			
			$('#lnkAccountExists').click(function() {										
				$('#home-signup').hide();
				$('#home-login').fadeIn(100);
				$('#lnkAccountExists').addClass("activeHomeLink");
				$('#lnkAccountNew').removeClass("activeHomeLink");				
			});	
							
			
			
			
			$('#lnkAccountNew').click(function() {										
				$('#home-login').hide();
				$('#home-signup').fadeIn(100);
				$('#lnkAccountNew').addClass("activeHomeLink");
				$('#lnkAccountExists').removeClass("activeHomeLink");
			});	

						
			$('#btn_msgsnd').click(function() {
			
				var msg = $("input#msg").val();
				if (msg == "")
				{    
					$("input#msg").focus();
					return false;
				}

				
									
				var dataString = 'rid='+ $("#tofield").html() + '&msg=' + msg;						
				//$('document').append("<br>" + dataString);
				
				//alert(dataString);
				
				 $.ajax({
				  type: "get",
				  url: _URL_ENGINE + "?m=sendMsg",
				  data: dataString,	
				   beforeSend:function(request){ AJAXIndic(); },
						success: function (html) {  
							AJAXIndicEnd();
							//alert(html);
							userMessageShow(html);
						}    
				 });	

					$("input#msg").val(" ");
			});	// message send button end

















			$('#passchng_btn').click(function() {
			
				var pass_pre = $("input#pass_pre").val();
				if (pass_pre == "")
				{    
					$("input#pass_pre").focus();
					return false;
				}

				var pass_new = $("input#pass_new").val();
				if (pass_new == "")
				{    
					$("input#pass_new").focus();
					return false;
				}

				var pass_cnf = $("input#pass_cnf").val();
				if (pass_cnf == "")
				{    
					$("input#pass_cnf").focus();
					return false;
				}
				
				if (pass_cnf != pass_new)
				{
					alert('password doesnt match!');
					return false;
				}
				
									
				var dataString = 'oldpass='+ pass_pre + '&newpass=' + pass_new;
				$('document').append("<br>" + dataString);
				
				alert(dataString);
				
				 $.ajax({
				  type: "get",
				  url: _URL_ENGINE + "?m=chngpass",
				  data: dataString,	
				   beforeSend:function(request){ AJAXIndic(); },
						success: function (html) {  
							AJAXIndicEnd();
							//alert(html);
							userMessageShow(html);
						}    
				 });										
			});	// message send button end
			
			
			

			
			
			
			$('#btnSignUp').click(function() {										
						
						var signup_email = $("input#signup_email").val();
						if (signup_email == "")
						{    
							$("input#signup_email").focus();
							return false;
						}
						
						
							var apos=signup_email.indexOf("@");
							var dotpos=signup_email.lastIndexOf(".");
							if (apos<1||dotpos-apos<2)
							{
								$("input#signup_email").focus();
								return false;
							}

							

						var signup_alias = $("input#signup_alias").val();
						if (signup_alias == "")
						{    
							$("input#signup_alias").focus();
							return false;
						}
						
						var dataString = 'signup_email='+ signup_email + '&signup_alias=' + signup_alias;						
						 $.ajax({
						  type: "post",
						  url: _URL_ENGINE + "?m=signUp",						   
						  data: dataString,	
						   beforeSend:function(request){ AJAXIndic(); },
								success: function (html) {  
									AJAXIndicEnd();
									//alert(html);
									userMessageShow(html);
								}    
						 });										
			});	// signup button end
			
			
			
			
			$('#btnSignIn').click(function() {
			
				var login_alias = $("input#login_alias").val();
				if (login_alias == "")
				{    
					$("input#login_alias").focus();
					return false;
				}			
					

				var login_password = $("input#login_password").val();
				if (login_password == "")
				{    
					$("input#login_password").focus();
					return false;
				}
				
				var dataString = 'login_alias='+ login_alias + '&login_password=' + login_password;						
				 $.ajax({
				  type: "post",
				  url: _URL_ENGINE + "?m=signIn",
				  data: dataString,	
				   beforeSend:function(request){ AJAXIndic(); },
						success: function (html) {  
							AJAXIndicEnd();
							//alert(html);
							userMessageShow(html);
						}    
				 });										
			});	// signin button end
			
			
		});
		
	// index page code end	 	
		
		
//	Functions
function AJAXIndic()
{
	var _URL = "" +getURL() + "";
	$.fn.colorbox({'href': '#loader', 'open':true, 'width':'400px', 'height':'100px', inline:true, escKey: false, overlayClose: false, iframe:true, 
			onLoad: function() {
					//$('#cboxClose').remove();
			}
	});    
}

function AJAXIndicEnd()
{
	//colorboxClose();
}
	
function colorboxClose()
{
	$.colorbox.close();
}

function userMessageShow(html, caption)
{
//'height':'250px'
		_html = "<div> <h3 id='caption'> User Message </h3> </br></br></div>"
		_html += html;
		$("#inline_call").html(_html);
		
		if(caption != null)
			$("#caption").html(caption);
	
			$.fn.colorbox({width:"50%", inline:true, href:"#inline_call"});
			
}
		

			
function sendMessage(alias)
{
		$("#tofield").html(alias);		
		$.fn.colorbox({width:"50%", inline:true, href:"#sndMsg" });	
}








function showMessages()
{
		//$("#tofield").html(alias);		

		var _URL_ENGINE = "" +getURL() + "_engine/";
		
		 $.ajax({
		  type: "post",
		  url: _URL_ENGINE + "?m=archivedMsgs",
		   beforeSend:function(request){ AJAXIndic();
											},
				success: function (html) {  
					AJAXIndicEnd();
					userMessageShow(html,"Messages!");
					//$("#listPlayersOnline").html(html);
				}    
		 });		
		 
		//$.fn.colorbox({width:"50%", inline:true, href:"#sndMsg" });	
}






function showProfile(alias)
{
	var profileUrl = APP_URL + "profile/" + alias;
	//userMessageShow(profileUrl);
			$.fn.colorbox({ height: '250px', width:"500px",  href: profileUrl, iframe: true });
			
}



function rejectgame(gid)
{


var ur = APP_URL + "play/?r=" + gid;

						 $.ajax({
						  type: "post",
						  url: ur,
						   beforeSend:function(request){ 
								//AJAXIndic(); 
							},
								success: function (html) {  
									//AJAXIndicEnd();									
									userMessageShow(html);
								}    
						 });			
}












var targetOffset = 0;
var targetOffset_max = 0;

function showNxtMsg()
{

targetOffset += 80;
	if(targetOffset < targetOffset_max)
	{						
		$('#archivedmsgs').animate({scrollTop: targetOffset}, 1000);
	}

	//alert(targetOffset_max);
}




function showPrevsMsg()
{
	
	if(targetOffset > 0 )
	{
		targetOffset -= 80;	
		$('#archivedmsgs').animate({scrollTop: targetOffset}, 1000);
	}
	else
	{
	
	}
		//alert('no more messages');
}



function recordMove(gid, player, frmC, toC)
{


var ur = APP_URL + "_engine/?";
				  
var dataString = "m=" + "recordMoves&gameID=" + gameID + "&player=" + player + "&from=" + frmC + "&to=" + toC;

//$("#etc").html(ur + dataString);

var uri = ur + dataString;
//alert(datastring);

//alert(ur + dataString);

						 $.ajax({
						  type: "post",						  
						  url: uri,
						   beforeSend:function(request){ 
								//AJAXIndic(); 
							},
								success: function (html) {  
									//AJAXIndicEnd();									
									//userMessageShow(html);
								}    
						 });			
}