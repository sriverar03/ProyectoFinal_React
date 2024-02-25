import React, { useContext, useState } from "react";
import { CartContext } from "../context/CardContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export const CartItems = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [orderId, setOrderId] = useState();

  const {
    cart,
    addItem,
    removeItem,
    clear,
    CantTotalProductos,
    SumaTotalProductos,
  } = useContext(CartContext);

  const generarOrden = () => {
    if (nombre.length === 0) {
      return false;
    }

    if (email.length === 0) {
      return false;
    }

    if (telefono.length === 0) {
      return false;
    }
    const buyer = {
      name: nombre,
      email: email,
      phone: telefono,
    };
    const items = cart.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
    }));
    const fecha = new Date();
    const date = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;
    const total = SumaTotalProductos();
    const order = { buyer: buyer, items: items, date: date, total: total };

    // agregar  en Firestore
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, order).then((resultado) => {
      clear();
      setOrderId(resultado.id);
    });
  };

  if (CantTotalProductos() == 0) {
    return (
      <div className="container-fluid p-300">
        <div className="row">
          <div className={`row callout  ${orderId ? "bg-green" : "bgcolor"}`}>
            <div className="col-md-9">
              <p className="lead">
                {orderId ? (
                  <span>
                    <i className="fa fa-check fa-2x"></i> Gracias por su compra,
                    N° de orden: {orderId}
                  </span>
                ) : (
                  <span>
                    <i className="fa fa-info-circle fa-2x"></i> No se
                    encontraron productos en el carro de compras!
                  </span>
                )}
              </p>
            </div>
            <div className="col-md-3">
              <div className="button-wrap text-center">
                <Link to={"/"} className="btn  btn-warning btn-lg ">
                  Volver a la página principal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bgcolor p-10" style={{ marginTop: "93px" }}>
      <div className="col-md-9 quoteform">
        <div className="pricing-box clearfix">
          <div className="pricing-header sixch">
            <h4>Productos</h4>
          </div>
          <div className=" sevench2">
            <table className="table">
              <tbody>
                {cart.map((pro) => (
                  <tr key={pro.id}>
                    <td>
                      <img src={pro.image} width={50} height={40}></img>
                    </td>
                    <td scope="row">{pro.title}</td>                    
                    <td>$ {pro.price}</td>
                    <td>{pro.quantity}</td>
                    <td>${pro.quantity * pro.price}</td>
                    <td><button onClick={() => {removeItem(pro.id)}} title="Eliminar"><i className="fa fa-trash"></i></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-3">
        <form className="quoteform">
          <div className="pricing-box clearfix mb-20">
            <div className="pricing-header sixch">
              <h4>Total Compra</h4>
            </div>
            <div className="pricing-top sevench">
              <i className="fa fa-check-circle colorIcon"></i>
              <p>$ {Number(SumaTotalProductos().toFixed(2))}</p>
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre Completo"
            onInput={(e) => {
              setNombre(e.target.value);
            }}
          />
          <input
            type="email"
            className="form-control"
            placeholder="email"
            onInput={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Telefono"
            onInput={(e) => {
              setTelefono(e.target.value);
            }}
          />
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={generarOrden}
          >
            Generar Orden
          </button>
          
        </form>
      </div>
    </div>
  );
};
