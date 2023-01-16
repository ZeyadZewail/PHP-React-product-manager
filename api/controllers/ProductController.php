<?php 

include_once 'Controller.php';
include_once './models/Product.php';
include_once './models/Book.php';
include_once './models/DVD.php';
include_once './models/Furniture.php';

class ProductController extends Controller{

    function Create(){
        try{

            $data = $this->getJsonBody();
            
            if($data->Type == "Book"){
                $product = new Book($data);
            }

            if($data->Type == "DVD"){
                $product = new DVD($data);
            }

            if ($data->Type == "Furniture") {
                $product = new Furniture($data);
            }
            
            $result = $product->CreateProduct();
            $this->echoJsonResponse($result);

          }catch(Exception $e){

            $this->echoJsonResponse($e);
        }
    }

    function Delete(){
        try{
            
            $data = $this->getJsonBody();
            $SKUsArray = $data->SKUs;
            $result = Product::DeleteProducts($SKUsArray);
            $this->echoJsonResponse($result);

          }catch(Exception $e){

            $this->echoJsonResponse($e);
        }  
    }

    function Get(){
        try{
            $data = $this->getJsonBody();
            $result = Product::GetProducts();
            $this->echoJsonResponse($result);
          }catch(Exception $e){

            $this->echoJsonResponse($e);
        }
    }

    function Update(){
        $this->echoJsonResponse(array('Error' => 'Not Implemented'));
    }

	
}


?>