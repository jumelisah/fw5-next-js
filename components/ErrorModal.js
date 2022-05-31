import React from "react";
import { BsXOctagonFill } from 'react-icons/bs'

const ErrorModal = ({children, message}) => {
  return(
    <div className="text-center">
      <BsXOctagonFill size={30} className="text-danger" />
      <p className="fs-4 fw-bold text-danger">{message}</p>
      {children}
    </div>
  )
}

export default ErrorModal