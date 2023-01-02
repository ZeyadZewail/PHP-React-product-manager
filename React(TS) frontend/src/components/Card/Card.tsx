import React, {FunctionComponent,useState,useEffect} from 'react';
import Product from '../../Interfaces/Product.interface';
import './Card.css';

interface CardInterface{
    Product: Product,
    toggleProduct: Function,
}

const Card: FunctionComponent<CardInterface> = ({Product,toggleProduct}) => {
    const [checked, setChecked] = useState(false);

    const parseTypeValue = (type:string,typeValue:string) =>{
      if(type === "DVD"){
        return "Size: " + typeValue + " MB"
      }
      if(type === "Book"){
        return "Weight: " + typeValue + "KG"
      }
      if(type === "Furniture"){
        return "Dimension: " + typeValue
      }
      
      return "Unknown Type";
    }

    const handleChange = () => {
      setChecked(!checked);
      toggleProduct(Product);
    };

  return (
    <div className='card' onClick={handleChange}>
      <input type="checkbox" checked={checked} onChange={handleChange} className='delete-checkbox'></input>
      <p>{Product.SKU}</p>
      <p>{Product.Name}</p>
      <p>{Product.Price}$</p>
      <p>{parseTypeValue(Product.Type,Product.TypeValue)}</p>
    </div>
  )
}

export default Card;