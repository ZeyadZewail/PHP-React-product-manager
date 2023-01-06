<?php 

    class Product{
    private $tables = 'product';

    //Product properties
    public $SKU;
    public $Name;
    public $Price;
    public $Type;
    public $TypeValue;

    //Constructor
    public function __construct($data){
        $this->SKU = $data->SKU;
        $this->Name = $data->Name;
        $this->Price = $data->Price;
        $this->Type = $data->Type;
        $this->TypeValue = $data->TypeValue;
    }

}

?>