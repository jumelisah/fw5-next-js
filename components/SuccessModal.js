import React from "react";
import { BsFillPatchCheckFill } from 'react-icons/bs'

const SuccessModal = ({children, message}) => {
  return(
    <div className="text-center">
      <BsFillPatchCheckFill size={30} className="text-success" />
      <p className="fs-4 fw-bold text-success">{message}</p>
      {children}
    </div>
  )
}

export default SuccessModal