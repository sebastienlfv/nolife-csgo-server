<?php 

	session_start();
	unset($_SESSION['steamid']);
	unset($_SESSION['steam_uptodade']);
	
	header('Location: index.php');

?>