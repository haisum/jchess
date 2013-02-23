
<?php

$string = "Here! is some text, and numbers 12345, and symbols !£$%^&";

$new_string = preg_replace("/[^a-zA-Z0-9]/", "", $string);

echo $new_string

?>