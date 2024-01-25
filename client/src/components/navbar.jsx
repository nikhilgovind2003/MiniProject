import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "phosphor-react";
import "./navbar.css";


export const Navbar = (data,{clearData}) => {
  

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/contact"> Contact </Link>
       {data.data? <Link to="/login" >Welcome {data.data} </Link>:<Link to="/login" >Login</Link>}
       {data.data?<button onClick={clearData}>Logout </button>:''}
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
