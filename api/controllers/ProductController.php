<?php 

include_once 'Controller.php';
include_once './models/Product.php';


class ProductController extends Controller{

    function Create(){
        $data = $this->getJsonBody();
        $product = new Product($data);
        $result = $product->CreateProduct();
        $this->echoJsonResponse($result);
    }

    function Delete(){
        $data = $this->getJsonBody();
        $SKUsArray = $data->SKUs;
        $result = Product::DeleteProducts($SKUsArray);
        $this->echoJsonResponse($result);
    }

    function Get(){
        $data = $this->getJsonBody();
        $result = Product::GetProducts();
        $this->echoJsonResponse($result);
    }

    function Update(){
        $this->echoJsonResponse(array('Error' => 'Not Implemented'));
    }

	
}












?>