import { useState } from 'react';
import OtpInput from 'react-otp-input'
const Otp = () =>{
  const [state, setState] = useState({otp: null})
  const handleChange = (otp) => setState({ otp });
  return (
    <OtpInput
      value={state.otp}
      onChange={handleChange}
      numInputs={6}
      separator={<span>-</span>}
    />
  )
}

export default Otp