<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Acces-Control-Allow-Methods: POST');

include_once './config/Database.php';
include_once './models/Product.php';

//instantiate DB and connect
$database = new Database();

$db = $database->connect();


$product = new Product($db);

$data = json_decode(file_get_contents("php://input"));

$product->SKU = $data->SKU;
$product->Name = $data->Name;
$product->Price = $data->Price;
$product->Type = $data->Type;
$product->TypeValue = $data->TypeValue;

// Create post
if($product->create()) {
    echo json_encode(array('message' => 'Product Created'));
  } else {
    echo json_encode(array('message' => 'Product Not Created'));
  }


?>