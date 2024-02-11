import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
import { useUser } from "../context/usercontext";

export const Navbar = () => {
  const { user, updateUser } = useUser();
  const style = {
    'color': 'white',
    'margin-left': '20px',
    'font-size': '20px',
  };


  function cleardata() {
    // Clear user data in localStorage and update the state
    alert('Logout successful')
    localStorage.clear();
    updateUser(null);
  }
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/contact"> Contact </Link>
       {localStorage.getItem('user')!=null ? <div style={style}>Welcome {localStorage.getItem('user')} </div> : <div><Link to='/login' style={style}>Login</Link></div>}
       {localStorage.getItem('user')!=null ? <button style={style} onClick={cleardata}>Logout </button>:''}
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
