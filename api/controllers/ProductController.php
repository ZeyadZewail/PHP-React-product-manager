<?php 

include_once 'Controller.php';
include_once './models/Product.php';


class ProductController extends Controller{

    function Create(){
        try{

            $data = $this->getJsonBody();
            $product = new Product($data);
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