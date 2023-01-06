<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST');
  header("Access-Control-Allow-Headers: X-Requested-With");


  include_once './controllers/ProductController.php';
  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));
  $controller = new ProductController();

  echo $controller->DeleteProducts($data->SKUs);

?>