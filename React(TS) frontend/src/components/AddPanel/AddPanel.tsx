import React, {FunctionComponent,useState,useRef} from 'react'
import Product from '../../Interfaces/Product.interface'
import './AddPanel.css'



const Addpanel: FunctionComponent = () => {

  let conditionalForm = useRef<HTMLFormElement>(null)
  let heightRef = useRef<HTMLInputElement>(null);
  let widthRef = useRef<HTMLInputElement>(null);
  let lengthRef = useRef<HTMLInputElement>(null);

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
              'Accept': 'application/json',
              'mode' : 'no-cors'
          },
          body: raw
        };

        const response = await fetch('http://127.0.0.1/edsa-scandiweb/create.php',requestOptions);
        const data = await response.json();
        console.log(data)
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
    conditionalForm.current?.reset();
    setFormData({ ...formData, [event.currentTarget.name]: event.target.value,["TypeValue"]: ""});
  }

  const conditionalRender = () =>{
    if(formData.Type == ""){
      return <div>-No Type-</div>
    }

    if(formData.Type == "DVD"){
      return <React.Fragment>
        <label  htmlFor='Size'> Size (MB):</label>
        <input onChange={updateFormNumbersOnly} type="text" name="TypeValue"/>
      </React.Fragment>
    }

    if(formData.Type == "Book"){
      return <React.Fragment>
        <label  htmlFor='Weight'> Weight (KG):</label>
        <input onChange={updateFormNumbersOnly} type="text" name="TypeValue"/>

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
        <input ref={heightRef} onChange={handleDimensions} type="text" name="Height"/>

        <label  htmlFor='Width'> Width (CM):</label>
        <input ref= {widthRef} onChange={handleDimensions} type="text" name="Width"/>

        <label  htmlFor='Length'> Length (CM):</label>
        <input ref={lengthRef} onChange={handleDimensions} type="text" name="Length"/>

      </React.Fragment>
    }
  }

  return (
    <div className='AddPanel'>
    <form id='product_form'>
      <label htmlFor='SKU'>SKU: </label>
      <input onChange={updateForm} type="text" name="SKU"/>
      <label htmlFor='Name'>Name:</label>
      <input onChange={updateForm} type="text" name="Name"/>
      <label  htmlFor='Price'>Price ($):</label>
      <input onChange={updateForm} type="text" name="Price"/>
      <label  htmlFor='Type'>Type Switcher:</label>
      <select onChange={updateSelection} name="Type" id="Type-select">
        <option value="">--Type--</option>
        <option value="DVD">DVD</option>
        <option value="Book">Book</option>
        <option value="Furniture">Furniture</option>
      </select>
      <form ref={conditionalForm} id='conditionalForm'>
      {conditionalRender()}
      </form>
    </form>
    {renderError()}
    <button name='submit' type='submit' className='SubmitButton' onClick={Submit} >Submit</button>
    </div>
  ) 
}

export default Addpanel;