import React, {FunctionComponent,useState,useEffect} from 'react';
import Product from '../../Interfaces/Product.interface';
import './Card.css';

interface CardInterface{
    Product: Product
}

const Card: FunctionComponent<CardInterface> = ({Product}) => {
    
  return (
    <div className='card'>
      <p>{Product.SKU}</p>
      <p>{Product.Name}</p>
      <p>{Product.Price}$</p>
      <p>{Product.TypeValue}</p>
    </div>
  )
}

export default Card;