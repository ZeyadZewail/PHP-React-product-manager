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


    }

?>