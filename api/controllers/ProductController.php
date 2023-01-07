<?php 

include_once 'Controller.php';
include_once './models/Product.php';


class ProductController extends Controller{

    function CreateProduct(){
        $data = $this->getJsonBody();
        $product = new Product($data);
        $result = $product->CreateProduct();
        $this->echoJsonResponse($result);
    }

    function DeleteProducts(){
        $data = $this->getJsonBody();
        $SKUsArray = $data->SKUs;
        $result = Product::DeleteProducts($SKUsArray);
        $this->echoJsonResponse($result);
    }

    function GetProducts(){
        $data = $this->getJsonBody();
        $result = Product::GetProducts();
        $this->echoJsonResponse($result);
    }

	public function getJsonBody() {
        return json_decode(file_get_contents("php://input"));
	}

	public function echoJsonResponse($data) {
        echo json_encode($data);
	}
}












?>