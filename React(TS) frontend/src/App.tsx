import React, { FunctionComponent, useState, useEffect } from 'react'
import CardHolder from './components/CardHolder/CardHolder';
import Navbar from './components/Navbar/navbar'
import Product from './Interfaces/Product.interface'



const App: FunctionComponent = () => {

    const [productData,setProducts] = useState<Product[]>([]);

    const getData = async ()=>{

        console.log('fetching....');
        const response = await fetch('http://127.0.0.1/edsa-scandiweb/Product.php');
        const data = await response.json() as Product[];

        setProducts(data);
        
        console.log('Product Data Recieved')
        
    }


    useEffect(()=>{
        getData();
        console.log(productData)
    },[])

  return (
    <React.Fragment>
        <Navbar/>
        <CardHolder Products={productData}/>
    </React.Fragment>

    )
}




export default App;