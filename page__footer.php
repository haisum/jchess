    <!-- Footer -->
    <div id="footer">
        <div style="margin: 0pt auto;">
            <p id="copyright">
                 <?php echo APP_COPYRIGHT ?><br>
            </p>
            <div class="footer-col">
                <ul>
                    <li class="header">Community</li>
                    <li><a href="#">Wiki</a></li>
                    <li><a href="#">Developers</a></li>
                    <li><a href="#">Partners</a></li>
            </ul>
            </div>
            <div class="footer-col">
                <ul>
                    <li class="header">Support</li>
                    <li><a href="#">Help Center</a></li>
                    <li><a href="#">Forums</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <ul>
                    <li class="header">About me</li>
                    <li><a href="http://haisum.info">Haisum</a></li>						
                </ul>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</div>

	<!-- inline calls -->
	<div style='display:none'>
		<div id='inline_call' style='padding:10px; background:#fff;'></div>
		
		<div id='loader' style="margin: auto auto; width: 130px;">
			<img src="<?php echo APP_URL; ?>_templates/default/images/loader.gif" />
		</div>

		<div id='chngPass' style="margin: auto auto; width: 130px; padding: 40px;">
		<h3> Paasword change</h3>
			Enter previous password: <input id="pass_pre" name="pass_pre" class="textinput smallinput" type="text"> </br>
			New password: <input id="pass_new" name="pass_new" class="textinput smallinput" type="password"> </br>
			Confirm password: <input id="pass_cnf" name="pass_cnf" class="textinput smallinput" type="password"> </br>
			<input id="passchng_btn" name="passchng_btn" type="button" value="Change password">
		</div>		

		<div id='sndMsg' style="margin: auto auto; width: 130px; padding: 40px;">
		<h3> Send message:</h3>
			To: <span id="tofield"></span><br>
			Enter your message: <input id="msg" name="msg" class="textinput smallinput" type="text"> </br>
			<input id="btn_msgsnd" name="btn_msgsnd" type="button" value="Send message">
		</div>				
		
		<!--
		<div id='msgs' style='padding:10px; background:#fff;'></div>
		-->
		
	</div>
	<!-- inline calls end -->
</body></html>


