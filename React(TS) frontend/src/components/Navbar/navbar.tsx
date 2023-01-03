import React, {FunctionComponent, useContext} from 'react'
import './navbar.css';
import { useNavigate ,useLocation} from "react-router-dom";

interface NavbarInterface{
  deleteSelectedProducts: Function,
}

const Navbar: FunctionComponent<NavbarInterface>= ({deleteSelectedProducts}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const locationBasedRender = () => {
    if(location.pathname == '/'){
      return <React.Fragment>
        <h1>Product List</h1>
        <div className='buttons'>
          <button onClick={() => navigate("/add")} >Add</button>
          <button onClick={() => deleteSelectedProducts()} id='delete-product-bin'>Mass Delete</button>
        </div>
      </React.Fragment>
    }else if (location.pathname == '/add'){
      return<React.Fragment>
        <h1>Add Product</h1>
        <div className='buttons'>
          <button onClick={() => navigate("/")} >Back</button>
        </div>
      </React.Fragment>
    }
  }

  return (
    <React.Fragment>
    <div className='navbar'>
        {locationBasedRender()}
    </div>
    <hr></hr>
    </React.Fragment>
  )
}




export default Navbar;