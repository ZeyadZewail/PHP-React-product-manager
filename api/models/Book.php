<?php 


include_once 'Product.php';

class Book extends Product
{

    public $Weight;
    
    public function __construct($data){
        $this->SKU = $data->SKU;
        $this->Name = $data->Name;
        $this->Price = $data->Price;
        $this->Type = $data->Type;
        $this->Weight = $data->TypeValue;
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
            TypeValue = :Weight';

            $statement = $conn->prepare($query);

            //sanitize input
            $this->SKU = htmlspecialchars(strip_tags($this->SKU));
            $this->Name = htmlspecialchars(strip_tags($this->Name));
            $this->Price = htmlspecialchars(strip_tags($this->Price));
            $this->Price = (float) $this->Price;
            $this->Type = htmlspecialchars(strip_tags($this->Type));
            $this->Weight = htmlspecialchars(strip_tags($this->Weight));

            //bind data
            $statement->bindParam(':SKU',$this->SKU);
            $statement->bindParam(':Name',$this->Name);
            $statement->bindParam(':Price',$this->Price,PDO::PARAM_INT);
            $statement->bindParam(':Type',$this->Type);
            $statement->bindParam(':Weight',$this->Weight);

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