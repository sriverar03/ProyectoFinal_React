import React from "react";
import { CartWidget } from "./CartWidget";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <header className="header site-header colorfulheader affix">
        <div className="container">
          <nav className="navbar navbar-default yamm">
            <div className="container-fluid">
              <div className="navbar-header">
                
                <a className="navbar-brand" href="index.html">
                  <img src="../src/assets/images/lightlogo.png" alt="Linda" />
                </a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                  <Link to="/"><i className="fa fa-home"> </i>  Inicio</Link>
                  </li>
                  
                  <li className="active">
                  <Link to="/categoria/electronics">Electronica</Link>   
                  </li>                
                  <li className="active">
                  <Link to="/categoria/jewelery">Joyas</Link> 
                  </li>
                  <li className="active">
                  <Link to="/categoria/women's clothing">Ropa de Mujer</Link>
                  </li>
                  <li  className="active">
                  <Link to="/categoria/men's clothing">Ropa de Hombre</Link>
                  </li>
                  <li className="lastlink hidden-xs hidden-sm">
                    <CartWidget />
                  </li>
                 
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};
