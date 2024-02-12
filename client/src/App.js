import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Login/Register";
import { UserProvider } from "./context/usercontext";

function App() {
 

  return (
    <div className="App">
      <ShopContextProvider>
        <UserProvider>
        <Router>
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </Router>
        </UserProvider>
      </ShopContextProvider>
    </div>
  );
}

export default App;
