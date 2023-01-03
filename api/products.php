<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


include_once './config/Database.php';
include_once './models/Product.php';

//instantiate DB and connect
$database = new Database();

$db = $database->connect();


$products = new Product($db);

$result = $products->read();
$num = $result->rowCount();

if ($num > 0) {

    $productsArray = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $productItem = array(
            'SKU' => $SKU,
            'Name' => $Name,
            'Price' => $Price,
            'Type' => $Type,
            'TypeValue' => $TypeValue,
        );

        array_push($productsArray, $productItem);
    }

    echo json_encode($productsArray);
}
else{
    echo json_encode(array());
}

?>