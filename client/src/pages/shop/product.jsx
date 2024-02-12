import React, { useContext} from "react";
import { ShopContext } from "../../context/shop-context";
import "./product.css";

export const Product = (props) => {
  const { category,description,id,image,price,rating,title } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];
 
  return (
    <div className="product">
      <img src={image} className="productImage"/>
      <div className="description">
        <p>
          <b className="producTitle">{title}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
