import React, { useState } from "react";

const Modal = ({children, handleClose}) => {
  return (
    <div className="position-absolute top-0 start-0 position-fixed d-flex justify-content-center align-items-center vh-100 vw-100" style={{zIndex: 999}}>
      <div className="bg-dark opacity-25 vh-100 vw-100" onClick={handleClose}></div>
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="position-absolute top-50 start-50 translate-middle bg-color6 d-flex justify-content-center align-items-center rounded shadow p-3" style={{width: 250, height:400}}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal