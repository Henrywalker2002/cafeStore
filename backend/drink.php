<?php 
    include_once("./src/user.php");
    $user = new Account();
    echo $user->getListStaff();
?>