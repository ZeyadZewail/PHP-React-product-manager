import React, {FunctionComponent,useState,useRef} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Product from '../../Interfaces/Product.interface'
import './AddPanel.css'
import {api} from '../../App'


const Addpanel: FunctionComponent = () => {



  const navigate = useNavigate();

  let heightRef = useRef<HTMLInputElement>(null);
  let widthRef = useRef<HTMLInputElement>(null);
  let lengthRef = useRef<HTMLInputElement>(null);
  let weightRef = useRef<HTMLInputElement>(null);
  let sizeRef = useRef<HTMLInputElement>(null);
  let formRef = useRef<HTMLFormElement>(null);

  const[error,SetError] = useState("");

  const [formData,setFormData] = useState({
    SKU:"",
    Name:"",
    Price:"",
    Type:"",
    TypeValue:""
  }
    );

  const Submit = async () => {
    if(validateForm()){
      let raw = JSON.stringify(formData);
      console.log(raw);
      let requestOptions = {
          method: 'POST',
          headers: {
              Accept: 'application/json'
          },
          body: raw
        };

        const response = await fetch(api + '/edsa-scandiweb/create.php',requestOptions);
        const data = await response.json();
        if(data["message"]){
          navigate("/");
        }else if(data["errorInfo"]){
          alert(data["errorInfo"][2])
        }
    };


  }

  const validateForm = () => {

    let value: keyof typeof formData;
    for(value in formData){
      if(formData[value].length == 0){
        SetError("Please Fill All Fields");
        return false
      }
    }

    if(formData.Type === "Furniture" && formData.TypeValue.length<5){
      SetError("Please Fill All Furniture Dimensions");
      return false
    }
    
    SetError("")
    return true;
  }

  const renderError = () => {
    if(error.length == 0 ){
      return <span></span>
    }else{
      return <p className='error'>{error}</p>
    }
  }

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({ ...formData, [event.currentTarget.name]: event.target.value});
  }

  const updateFormNumbersOnly = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const result = event.target.value.replace(/\D/g, '');
    event.target.value = result;
    setFormData({ ...formData, [event.currentTarget.name]: event.target.value});
  }
  
  const updateSelection = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    resetConditionalForm();
    setFormData({ ...formData, [event.currentTarget.name]: event.target.value,["TypeValue"]: ""});
  }

  const resetConditionalForm = () => {
    if(heightRef.current && lengthRef.current && widthRef.current){
      heightRef.current.value = "";
      lengthRef.current.value = "";
      widthRef.current.value = "";
    }

    if(weightRef.current){
      weightRef.current.value ="";
    }

    if(sizeRef.current){
      sizeRef.current.value ="";
    }
  }

  const conditionalRender = () =>{
    if(formData.Type == ""){
      return <div>-No Type-</div>
    }

    if(formData.Type == "DVD"){
      return <React.Fragment>
        <label  htmlFor='size'> Size (MB):</label>
        <input ref={sizeRef} id="size" onChange={updateFormNumbersOnly} type="text" name="TypeValue" title='Please input a Size'/>
      </React.Fragment>
    }

    if(formData.Type == "Book"){
      return <React.Fragment>
        <label  htmlFor='Weight'> Weight (KG):</label>
        <input ref={weightRef} id="weight" onChange={updateFormNumbersOnly} type="text" name="TypeValue" title='Please input a Weight'/>

      </React.Fragment>
    }

    if(formData.Type == "Furniture"){

      const handleDimensions = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const result = event.target.value.replace(/\D/g, '');
        event.target.value = result;

        const typeValue = heightRef.current?.value+ "x" +widthRef.current?.value + "x" + lengthRef.current?.value
        setFormData({ ...formData, ["TypeValue"]: typeValue});
      }

      return <React.Fragment>
        <label  htmlFor='Height'> Height (CM):</label>
        <input ref={heightRef} id= "height" onChange={handleDimensions} type="text" name="Height" title='Please input a Height'/>

        <label  htmlFor='Width'> Width (CM):</label>
        <input ref= {widthRef} id= "width" onChange={handleDimensions} type="text" name="Width" title='Please input a Width'/>

        <label  htmlFor='Length'> Length (CM):</label>
        <input ref={lengthRef} id= "length" onChange={handleDimensions} type="text" name="Length" title='Please input a Length'/>

      </React.Fragment>
    }
  }

  return (
    <div className='AddPanel'>
    <form ref={formRef} id='product_form'>
      <label htmlFor='SKU'>SKU: </label>
      <input onChange={updateForm} id="sku" type="text" name="SKU" title='Please input a SKU'/>
      <label htmlFor='Name'>Name:</label>
      <input onChange={updateForm} id="name" type="text" name="Name" title='Please input a Name'/>
      <label  htmlFor='Price'>Price ($):</label>
      <input onChange={updateFormNumbersOnly} id="price" type="text" name="Price" title='Please input a Price'/>
      <label  htmlFor='Type'>Type Switcher:</label>
      <select onChange={updateSelection} id="productType" name='Type' title='Please Pick a Type'>
        <option value="">--Type--</option>
        <option value="DVD">DVD</option>
        <option value="Book">Book</option>
        <option value="Furniture">Furniture</option>
      </select>
      {conditionalRender()}
    </form>
    {renderError()}
    <button name='submit' type='submit' className='SubmitButton' onClick={Submit} >Save</button>
    </div>
  ) 
}

export default Addpanel;