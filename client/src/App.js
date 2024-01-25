import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Login/Register";

import { useState } from "react";

function App() {
  const [data, setData] = useState();
  const handleDataChange = newData => {
    setData(newData);
  };
  const clearData = () => {
    setData({});
    console.log('gt')
  };
 
  return (
    <div className="App">
      <ShopContextProvider>
        
        <Router>
          <Navbar data={data} clearData={clearData}/>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login onDataChange={handleDataChange} />} />
          </Routes>
        </Router>
        
      </ShopContextProvider>
    </div>
  );
}

export default App;
