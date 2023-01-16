<?php 


    include_once './config/Database.php';

    abstract class Product{
    private $tables = 'product';

    //Product properties
    public $SKU;
    public $Name;
    public $Price;
    public $Type;


    abstract function CreateProduct();

    public static function DeleteProducts($SKUsArray){
        
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
          return array('message' => 'Products Deleted');
        }

        return array('message' => 'Products Not Deleted');

    }

    public static function GetProducts(){
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

                return $productsArray;
        }else{
            return array();
        };

    }
}

?>