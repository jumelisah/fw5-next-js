import { useState } from 'react';
import OtpInput from 'react-otp-input'

const Otp = ({value, onChange}) =>{
  return (
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={6}
      separator={<span>-</span>}
    />
  )
}

export default Otp