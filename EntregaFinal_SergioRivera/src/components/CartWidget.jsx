import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CardContext";

export const CartWidget = () => {
  const {CantTotalProductos} = useContext(CartContext);
  return (
    <Link to="/carrito"
      className=" btn btn-primary  position-relative"
      style={{ paddingLeft: "10px", paddingRight: "1px" }}
    >
      <i
        className="glyphicon glyphicon-shopping-cart"
        style={{ marginRight: "1px", fontSize: "20px" }}
      ></i>
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{ color: "white", backgroundColor: "orange", top: "-20px" }}
      >
        {CantTotalProductos()}<span className="visually-hidden"></span>
      </span>
    </Link>
  );
};
