import React, {FunctionComponent,useState,useEffect} from 'react'
import Product from '../../Interfaces/Product.interface'
import Card from '../Card/Card'
import './CardHolder.css'

interface CardsHolderInterface{
    Products: Product[],
    toggleProduct: Function,
    isLoading:Boolean
}

const CardHolder: FunctionComponent<CardsHolderInterface> = ({Products,toggleProduct,isLoading}) => {

    const loadingCheck = () =>{
      if(isLoading){
        return <div className='loading'><h1>Loading....</h1></div>
      }else{
        let products = cards();
        if(products.length != 0){
          return <div className='cardholder'>{cards()}</div>
        }else{
          return <div className='loading'><h1>No Products</h1></div>
        }
        
      }
    }

    const cards = () => {
      if(!isLoading && Products.length != 0 ){
        return Products.map((item)=> <Card toggleProduct={toggleProduct} key={item.Name} Product={item}/>);
      }else{
        return [];
      }
      
    }

  return (
    <React.Fragment>
      {loadingCheck()}
    </React.Fragment>
  )
}

export default CardHolder;