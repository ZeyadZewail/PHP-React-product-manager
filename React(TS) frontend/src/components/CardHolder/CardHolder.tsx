import React, {FunctionComponent,useState,useEffect} from 'react'
import Product from '../../Interfaces/Product.interface'
import Card from '../Card/Card'
import './CardHolder.css'

interface CardsHolderInterface{
    Products: Product[]
}

const CardHolder: FunctionComponent<CardsHolderInterface> = ({Products}) => {

    const loadingCheck = () =>{
      if(Products.length==0){
        return <div className='loading'><h1>Loading....</h1></div>
      }else{
        return <div className='cardholder'>{cards}</div>
      }
    }

    const cards = Products.map((item)=> <Card key={item.Name} Product={item}/>);

  return (
    <React.Fragment>
      {loadingCheck()}
    </React.Fragment>
  )
}

export default CardHolder;