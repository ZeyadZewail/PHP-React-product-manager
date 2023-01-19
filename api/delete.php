<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST');
  header("Access-Control-Allow-Headers: X-Requested-With");


  include_once './controllers/ProductController.php';

  $controller = new ProductController();
  $controller->Delete();
