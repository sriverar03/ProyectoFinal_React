import React from "react";

export const Loading = () => {
  return (
    <div className="container text-center mt-10">
      <div className="row">
        <div className="col-md-12 bg ">
          <div className="loader" id="loader-1">                   
          </div>
          <span>Cargando..</span>
        </div>
      </div>
    </div>
  );
};
