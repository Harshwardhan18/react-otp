import { useState } from 'react';
import Button from '../UI/Button/Button';

const OTP = (props) => {
  const [otp, setOtp] = useState('');
  
  const submitHandler = (event) => {
    event.preventDefault();
    props.onOtpSubmit(otp);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={`${props.classes.control}`}>
        <label htmlFor='otp'>Enter OTP</label>
        <input
          type='text'
          onChange={(event) => {
            setOtp(event.target.value);
          }}
        />
      </div>
      <div className={props.classes.actions}>
        <Button type='submit' className={props.classes.btn}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default OTP;
