import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";


export const Navbar = (data,{clearData}) => {
  

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/contact"> Contact </Link>
       {data.data? <Link to="/" >Welcome {data.data} </Link>:<Link to="/login" >Login</Link>}
       {data.data?<Link to="" className="logout" onClick={clearData}>Logout </Link>:''}
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
