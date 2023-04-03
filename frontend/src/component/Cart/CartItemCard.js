import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      {/* <span>{console.log(item)}</span> */}
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <span>{`Color: ${item.color}`}</span>
        <span>{`Size: ${item.size}`}</span>
        <p onClick={() => deleteCartItems(item.product)} style={{ fontSize: "18px" }}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
