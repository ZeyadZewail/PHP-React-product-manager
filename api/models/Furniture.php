<?php 


include_once 'Product.php';

class Furniture extends Product
{

    public $Dimensions;
    
    public function __construct($data){
        $this->SKU = $data->SKU;
        $this->Name = $data->Name;
        $this->Price = $data->Price;
        $this->Type = $data->Type;
        $this->Dimensions = $data->TypeValue;
    }


    function CreateProduct(){
        try{
            $database = new Database();
            $conn = $database->connect();
            

            $query = 'INSERT INTO product'.' SET 
            SKU = :SKU,
            Name= :Name,
            Price = :Price,
            Type = :Type,
            TypeValue = :Dimensions';

            $statement = $conn->prepare($query);

            //sanitize input
            $this->SKU = htmlspecialchars(strip_tags($this->SKU));
            $this->Name = htmlspecialchars(strip_tags($this->Name));
            $this->Price = htmlspecialchars(strip_tags($this->Price));
            $this->Price = (float) $this->Price;
            $this->Type = htmlspecialchars(strip_tags($this->Type));
            $this->Dimensions = htmlspecialchars(strip_tags($this->Dimensions));

            //bind data
            $statement->bindParam(':SKU',$this->SKU);
            $statement->bindParam(':Name',$this->Name);
            $statement->bindParam(':Price',$this->Price,PDO::PARAM_INT);
            $statement->bindParam(':Type',$this->Type);
            $statement->bindParam(':Dimensions',$this->Dimensions);

            if($statement->execute()){
                return array('message' => 'Product Created');
            }

            return false;
        }catch(Exception $e){
            return $e;
        }
    }


}


?>