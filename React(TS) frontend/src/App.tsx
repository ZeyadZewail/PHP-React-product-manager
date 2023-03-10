import React, { FunctionComponent, useState, useEffect, useContext, createContext } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import CardHolder from './components/CardHolder/CardHolder';
import Navbar from './components/Navbar/navbar'
import Product from './Interfaces/Product.interface'
import Addpanel from './components/AddPanel/AddPanel';

//export const api = 'https://scandiweb-zeyad.000webhostapp.com/';
export const api = 'http://127.0.0.1:80/';
//export const api = '';

const App: FunctionComponent = () => {

    

    const [productData,setProducts] = useState<Product[]>([]);
    const [selectedProducts,setSelectedProducts] = useState<Product[]>([]);
    const [isLoading,setLoading] = useState(true);
    const location = useLocation();

    const resetSelected = ()=>{
        setSelectedProducts([])
    }


    const toggleProduct = (product:Product)=>{
        if(selectedProducts.includes(product)){
            setSelectedProducts(selectedProducts.filter((item) => item != product));
        }else{
            setSelectedProducts([product,...selectedProducts]);
        }
    }

    const getData = async ()=>{
        setLoading(true);
        if(location.pathname != '/'){
            return false;
        }

        console.log('fetching....');
        const response = await fetch(api+ '/edsa-scandiweb/products.php');
        const data = await response.json() as Product[];

        setProducts(data);
        setLoading(false);
        console.log('Product Data Recieved')
        
    }

    useEffect(()=>{
        console.log("Chosen: ",selectedProducts)
    },[selectedProducts])

    useEffect(()=>{
        getData();
    },[location])

    const deleteSelectedProducts = async () => {
        if(selectedProducts.length == 0){
            alert('Nothing to delete')
            return false;
        }


        let SKUs = []
        for(let product of selectedProducts){
            SKUs.push(product.SKU);
        }
        console.log("Deleting",SKUs)

        let SKUsJson = {"SKUs": SKUs};

        let raw = JSON.stringify(SKUsJson);
        console.log(raw);
        let requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: raw
          };

        const response = await fetch(api + '/edsa-scandiweb/delete.php',requestOptions);
        const data = await response.json();

        getData();
        alert(data["message"]);
    }



  return (

        <React.Fragment>
        <Navbar deleteSelectedProducts={deleteSelectedProducts} resetSelected={resetSelected}/>
        <Routes>
            <Route path='/' element={<CardHolder isLoading={isLoading} Products={productData} toggleProduct={toggleProduct}/>}/>
            <Route path='/add' element={<Addpanel/>}/>
        </Routes>
        </React.Fragment>

    )
}

export default App;