import React, { useEffect, useState } from "react";
import listaProductos from "../data/Productos.json";
import { Link, useParams } from "react-router-dom";
import {doc, getDoc,getDocs,getFirestore,collection,query,where} from "firebase/firestore";
import { Loading } from "./Loading";

export const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensajeError, setMensajeError] = useState("");
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "productos");
    const consulta = id ? query(itemsCollection, where("category", "==", id)) : itemsCollection;
    getDocs(consulta).then(resultado => {
      setLoading(false);
      setProductos(resultado.docs.map(producto => ({id:producto.id, ...producto.data()}))); 
    }); 
   
}, [id]);

 

  return (
    <section className="section ">
      <div className="container">
        <div className="row">
        {loading ? <Loading /> : 
          productos.map((pro) => (
            <div key={pro.id} className="col-md-4 mb">
              <div className="case-box">
                <div>
                  <img src={pro.image} alt="" className=" card-img-top" />
                </div>
                <div className="case-info clearfix">
                  <div className="pull-left mg-text">
                    <h5>{pro.title}</h5>
                    <small>$ {pro.price}</small>
                  </div>
                  <div>
                    <span className="case-link">
                      <Link to={"/producto/" + pro.id} >						
                       <span><i className="fa fa-link"></i></span>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
