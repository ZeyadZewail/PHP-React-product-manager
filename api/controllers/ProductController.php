<?php 

include_once './config/Database.php';
include_once './models/Product.php';


class ProductController{

    function CreateProduct($productData){
        try{
            $database = new Database();
            $conn = $database->connect();
            

            $product = new Product($productData);

            
            $query = 'INSERT INTO product'.' SET 
            SKU = :SKU,
            Name= :Name,
            Price = :Price,
            Type = :Type,
            TypeValue = :TypeValue';

            $statement = $conn->prepare($query);

            //sanitize input
            $product->SKU = htmlspecialchars(strip_tags($product->SKU));
            $product->Name = htmlspecialchars(strip_tags($product->Name));
            $product->Price = htmlspecialchars(strip_tags($product->Price));
            $product->Price = (float) $product->Price;
            $product->Type = htmlspecialchars(strip_tags($product->Type));
            $product->TypeValue = htmlspecialchars(strip_tags($product->TypeValue));

            //bind data
            $statement->bindParam(':SKU',$product->SKU);
            $statement->bindParam(':Name',$product->Name);
            $statement->bindParam(':Price',$product->Price,PDO::PARAM_INT);
            $statement->bindParam(':Type',$product->Type);
            $statement->bindParam(':TypeValue',$product->TypeValue);

            if($statement->execute()){
                return json_encode(array('message' => 'Product Created'));
            }

            return false;
        }catch(Exception $e){
            return json_encode($e);
        }
    }

    function DeleteProducts($SKUsArray){
        $database = new Database();
        $conn = $database->connect();

        $SKUs = implode(',', array_fill(0, count($SKUsArray), '?'));

        // Create query
        $query = 'DELETE FROM product' . ' WHERE SKU IN(' . $SKUs . ')';

        // Prepare statement
        $statement = $conn->prepare($query);

        foreach ($SKUsArray as $k => $SKU)
            $statement->bindValue(($k+1), $SKU)
        ;

        // Execute query
        if($statement->execute()) {
          return json_encode(array('message' => 'Products Deleted'));
        }

        return json_encode(array('message' => 'Products Not Deleted'));

    }

    function GetProducts(){
        $database = new Database();
        $conn = $database->connect();

        $query = 'Select * from product';

        $statement = $conn->prepare($query);
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $productsArray = array();

            while($row = $statement->fetch(PDO::FETCH_ASSOC)){
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

                return json_encode($productsArray);
        }else{
            return json_encode(array());
        };

    }
}












?>