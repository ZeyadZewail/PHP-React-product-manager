import React, {FunctionComponent,useState,useEffect} from 'react'
import Product from '../../Interfaces/Product.interface'

interface CardInterface{
    Product: Product
}

const Card: FunctionComponent<CardInterface> = ({Product}) => {
    
  return (
    <div>{Product.Name}</div>
  )
}

export default Card;