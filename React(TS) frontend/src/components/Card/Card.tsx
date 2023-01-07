import React, {FunctionComponent,useState,useEffect} from 'react';
import Product from '../../Interfaces/Product.interface';
import './Card.css';

interface CardInterface{
    product: Product,
    toggleProduct: Function,
}

const Card: FunctionComponent<CardInterface> = ({product,toggleProduct}) => {
    const [checked, setChecked] = useState(false);

    const productTypeFormatters:any = {
      DVD: (value: string) => `Size ${value} MB`,
      Book: (value: string) => `Weight: ${value} KG`,
      Furniture: (value: string) => `Dimension: ${value}`,
      default: (value: string) => `Unknown Type: ${value}`,
   }


    const handleChange = () => {
      setChecked(!checked);
      toggleProduct(product);
    };

  return (
    <div className='card' onClick={handleChange}>
      <input type="checkbox" checked={checked} onChange={handleChange} className='delete-checkbox'></input>
      <p>{product.SKU}</p>
      <p>{product.Name}</p>
      <p>{product.Price}$</p>
      <p>{productTypeFormatters[product.Type]?.(product.TypeValue) ?? productTypeFormatters["default"](product.TypeValue)}</p>
    </div>
  )
}

export default Card;