import React, { useContext, useEffect, useState } from "react";
import listaProductos from "../data/Productos.json";
import {doc, getDoc,getFirestore} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { CartContext } from "../context/CardContext";

export const ItemDetailContainer = () => {
  const {addItem} = useContext(CartContext);
  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState(1);
  const [itemAdded, setItemAdded] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const { id } = useParams();


  useEffect(() => {
    const db = getFirestore();
   
    const producto = doc(db, "productos", id);
    getDoc(producto).then(resultado => { 
      setLoading(false);      
      setProducto({id:resultado.id, ...resultado.data()});
    });
    
}, [id]); 

  const handleContadorAumenta = () => {
    setStock(stock + 1);
  };

  const handleContadorDisminuye = () => {
    if (stock > 1) {
      setStock(stock - 1);
    }
  };

  const addToCart = () => {   
        setItemAdded(true); 
        addItem(producto,stock);       
    }


  return (
    <>
    {loading ? <Loading /> : 
    <section className="section lb">
      <div className="container">       
          <div key={producto.id} className="row">
            <div className="col-md-5 col-sm-5 col-xs-12">
              <div className="pitem">
                <div className="case-box">
                  <img
                    src={producto.image}
                    alt=""
                    className="img-responsive img-item"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-7 col-sm-7 col-xs-12">
              <div className="case-details">
                <h3>
                  {producto.title}
                  <small>                  
                  </small>
                </h3>

                <p> {producto.description}. </p>
                <h3>$ {producto.price}</h3>
              </div>
              <div>
                <button  onClick={handleContadorDisminuye}>-</button>
                <button
                  className="text-center"
                  type="text"                  
                  style={{ width: "50px" }}
                 
                >{stock}</button>
                <button onClick={handleContadorAumenta}>+</button>
              </div>
              {itemAdded ? <Link to={"/carrito"} className="btn btn-primary btn-sm" style={{marginTop:"20px"}}>Terminar Mi Compra</Link> : <button type="button" className="btn btn-primary btn-sm" onClick={addToCart} style={{marginTop:"20px"}}>Agregar al Carrito</button>}
             
            </div>
          </div>
       
      </div>
    </section>}
    </>
  );
};
