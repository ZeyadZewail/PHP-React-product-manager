<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST');
  header("Access-Control-Allow-Headers: X-Requested-With");

  include_once './config/Database.php';
  include_once './models/Product.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog post object
  $product = new Product($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  // Delete post
  if($product->deleteProducts($data->SKUs)) {
    echo json_encode(
      array('message' => 'Products Deleted')
    );
  } else {
    echo json_encode(
      array('message' => 'Products Not Deleted')
    );
} 
?>