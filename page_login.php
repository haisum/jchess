    <div id="content" class="clearfix">        
        <div id="full-content">
			<div id="landing-page">
				<div id="logo-container">
					<a href="<?php echo APP_URL; ?>"><img id="logo" src="<?php echo APP_URL; ?>/_templates/<?php echo APP_TEMPLATE ?>/logo.png" alt=""></a>
				</div>
			
			<div id="loginSignUpGuest">				
				<a href="#login" id="lnkAccountExists" class="activeHomeLink">
					I have an account /
				</a>
				<a id="lnkAccountNew" href="#signUp">
					I am new 
				</a>
				<!--
				<a id="lnkAccountGuest" href="<?php echo APP_URL; ?>play/guest/" style="visible:none;">
					Play as guest
				</a>
				-->
			</div>			
						<div id="home-login" >
							<form action="_engine/" method="post">
								<p>
									<b> Please enter your login details to sign in  </b> 
								</p>
								<label>Login ID</label>
								<input id="login_alias" name="login_alias" class="textinput smallinput" type="text">
								<label> Password</label>
								<input id="login_password" name="login_password" class="textinput smallinput" value="" type="password">
								<input value="Log in" class="welcome-submit button"  type="button" id="btnSignIn">
							</form>
						</div>			
						<div id="home-signup" style="display:none;">
							<form action="_engine/" method="post">
								<p>
									<b> :D:D:D:D:D:D:D:D:D:D:D:D:D:D:D:D  </b> 
								</p>							
								<label>Email</label>
								<input id="signup_email" name="signup_email" class="textinput smallinput" type="text">
								<label> Your Alias </label>
								<input id = "signup_alias" name="signup_alias" class="textinput smallinput" value="" type="text">
								<input value="SignUp" type="button" id="btnSignUp">
							</form>
						</div>		
				
				<div id="welcometxt" style="padding: 25px;">
					<p>
						We appreciate if you register so we can enhance your experience with customizations and ratings. <br/>
						If you dont wanna register, you can still <a href="<?php echo APP_URL; ?>play/guest/"> play </a> as a guest. Have a good time playing here. :)
					</p>
				</div>
			</div>
        </div>
        <br class="clear">
    </div>