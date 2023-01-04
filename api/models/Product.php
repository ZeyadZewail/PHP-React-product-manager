<?php 

    class Product{
    private $conn;
    private $tables = 'product';


    //Product properties
    public $SKU;
    public $Name;
    public $Price;
    public $Type;
    public $TypeValue;

    //Constructor
    public function __construct($db){
        $this->conn = $db;
    }

    public function read(){

        $query = 'Select * from product';

        $statement = $this->conn->prepare($query);
        $statement->execute();

        return $statement;

    }

    public function create(){
        $query = 'INSERT INTO product'.' SET 
        SKU = :SKU,
        Name= :Name,
        Price = :Price,
        Type = :Type,
        TypeValue = :TypeValue';

        $statement = $this->conn->prepare($query);

        //sanitize input
        $this->SKU = htmlspecialchars(strip_tags($this->SKU));
        $this->Name = htmlspecialchars(strip_tags($this->Name));
        $this->Price = htmlspecialchars(strip_tags($this->Price));
        $this->Price = (float) $this->Price;
        $this->Type = htmlspecialchars(strip_tags($this->Type));
        $this->TypeValue = htmlspecialchars(strip_tags($this->TypeValue));

        //bind data
        $statement->bindParam(':SKU',$this->SKU);
        $statement->bindParam(':Name',$this->Name);
        $statement->bindParam(':Price',$this->Price,PDO::PARAM_INT);
        $statement->bindParam(':Type',$this->Type);
        $statement->bindParam(':TypeValue',$this->TypeValue);

        if($statement->execute()){
            return true;
        }

        return false;
    }

    public function deleteProducts($SKUsArray) {

        $SKUs = implode(',', array_fill(0, count($SKUsArray), '?'));
        
        // Create query
        $query = 'DELETE FROM product' . ' WHERE SKU IN(' . $SKUs . ')';

        // Prepare statement
        $statement = $this->conn->prepare($query);

        foreach ($SKUsArray as $k => $SKU)
            $statement->bindValue(($k+1), $SKU)
        ;

        // Execute query
        if($statement->execute()) {
          return true;
        }

        return false;
  }
    

}

?>