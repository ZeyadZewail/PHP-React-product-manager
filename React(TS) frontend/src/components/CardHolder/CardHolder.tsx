import React, {FunctionComponent,useState,useEffect} from 'react'
import Product from '../../Interfaces/Product.interface'
import Card from '../Card/Card'

interface CardsHolderInterface{
    Products: Product[]
}

const CardHolder: FunctionComponent<CardsHolderInterface> = ({Products}) => {

    const cards = Products.map((item)=> <Card key={item.Name} Product={item}/>);

  return (
    <div>
        {cards}
    </div>
  )
}

export default CardHolder;