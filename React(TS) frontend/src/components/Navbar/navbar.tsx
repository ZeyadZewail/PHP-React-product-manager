import React, {FunctionComponent} from 'react'
import './navbar.css';

const Navbar: FunctionComponent = () => {

  return (
    <React.Fragment>
    <div className='navbar'>
        <h1>Product List</h1>
        <div className='buttons'>
            <button>Add</button>
            <button id='delete-product-bin'>Mass Delete</button>
        </div>
    </div>
    <hr></hr>
    </React.Fragment>
  )
}




export default Navbar;