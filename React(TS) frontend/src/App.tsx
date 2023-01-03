import React, { FunctionComponent, useState, useEffect } from 'react'
import CardHolder from './components/CardHolder/CardHolder';
import Navbar from './components/Navbar/navbar'
import Product from './Interfaces/Product.interface'



const App: FunctionComponent = () => {

    const [productData,setProducts] = useState<Product[]>([]);
    const [chosenProducts,setChosenProducts] = useState<Product[]>([]);

    const toggleProduct = (product:Product)=>{
        if(chosenProducts.includes(product)){
            setChosenProducts(chosenProducts.filter((item) => item != product));
        }else{
            setChosenProducts([product,...chosenProducts]);
        }
    }


    const getData = async ()=>{

        console.log('fetching....');
        const response = await fetch('http://127.0.0.1/edsa-scandiweb/products.php');
        const data = await response.json() as Product[];

        setProducts(data);
        
        console.log('Product Data Recieved')
        
    }

    useEffect(()=>{
        console.log("Chosen: ",chosenProducts)
    },[chosenProducts])

    useEffect(()=>{
        getData();
        console.log(productData)
    },[])

  return (
    <React.Fragment>
        <Navbar/>
        <CardHolder Products={productData} toggleProduct={toggleProduct}/>
    </React.Fragment>

    )
}




export default App;