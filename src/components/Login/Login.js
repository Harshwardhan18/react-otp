import React, { useState, useReducer } from 'react';
import validator from 'validator'; 

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import OTP from './Otp';

const phoneReducer = (state, action) => {
  if (action.type === 'PHONE_CHANGE') {
    return {
      ...state,
      value: action.phone,
      isValid: validator.isMobilePhone(action.phone, 'en-IN'),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      ...state,
      value: state.value,
      isValid: validator.isMobilePhone(state.value, 'en-IN'),
    };
  }

  return {
    value: '',
    isValid: false,
  };
};

// const otpReducer = (state, action) => {
//   if (action.type === 'OTP_CHANGE') {
//     return {
//       ...state,
//       value: action.otp,
//       isValid: action.otp.trim().length > 6,
//     };
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return {
//       ...state,
//     };
//   }

//   return {
//     value: '',
//     isValid: false,
//   };
// };

const Login = (props) => {
  const [formSubmitted, setFormSubmit] = useState(false);
  const [isOtpValid, setOtpIsValid] = useState(null);
  const [phoneState, dispatchPhone] = useReducer(phoneReducer, {
    value: '',
    isValid: null,
  });


  const phoneChangeHandler = (event) => {
    dispatchPhone({ type: 'PHONE_CHANGE', phone: event.target.value });
  };

  const { isValid: phoneIsValid } = phoneState;
 
  const validatePhoneHandler = () => {
    dispatchPhone({ type: 'INPUT_BLUR' });
  };

  const submitPhoneHandler = (event) => {
    event.preventDefault();
    setFormSubmit(true);
    // props.onLogin(phoneState.value, otpState.value);
  };

  const submitOtpHandler = (otp) => {
    console.log(otp, 'chh');
    if (otp === '1111') {
      setOtpIsValid(true);
      props.onLogin(phoneState.value, otp);     
    } else {
      setOtpIsValid(false);
    }
  }

  return (
    <Card className={classes.login}>
      {!formSubmitted && (
        <form onSubmit={submitPhoneHandler}>
          <div
            className={`${classes.control} ${
              phoneIsValid === false ? classes.invalid : ''
            }`}
          >
            <label htmlFor='phone'>Phone Number</label>
            <input
              type='tel'
              id='phone'
              value={phoneState.value}
              onChange={phoneChangeHandler}
              onBlur={validatePhoneHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button
              type='submit'
              className={classes.btn}
              disabled={!phoneIsValid}
            >
              Send OTP
            </Button>
          </div>
        </form>
      )}
      {formSubmitted && <OTP classes={classes} onOtpSubmit={submitOtpHandler} />}
      {isOtpValid === false && <p>Please enter valid OTP</p>}
    </Card>
  );
};

export default Login;
