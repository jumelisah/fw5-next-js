import { useState } from 'react';
import OtpInput from 'react-otp-input'

const Otp = ({value, onChange}) =>{
  return (
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={6}
      separator={<span>-</span>}
      isInputNum={true}
      inputStyle={{width: 40, height: 40, border: '1px solid green'}}
    />
  )
}

export default Otp