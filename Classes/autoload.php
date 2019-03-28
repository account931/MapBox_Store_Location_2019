<?php
//NOT USED, USE COMPOSER AUTOLOAD INSTEAD
//uses autoload instead of manual includin each class
spl_autoload_register ('autoload');
function autoload ($className) {
  $fileName = $className . '.php';
  include  $fileName;
  }
?>