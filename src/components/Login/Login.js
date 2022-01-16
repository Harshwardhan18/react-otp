import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (state, action) => {
  if (action.type === 'EMAIL_CHANGE') {
    return {
      ...state,
      value: action.email,
      isValid: action.email.includes('@')
    };
  }
  if (action.type === 'INPUT_BLUR') { 
    return {
      ...state,
      value: state.value,
      isValid: state.value.includes('@'),
    };
  }
  
  return {
    value: '',
    isValid: false
  }
}

const passwordReducer = (state, action) => { 

  if (action.type === 'PASSWORD_CHANGE') { 
    return {
      ...state,
      value: action.password,
      isValid: action.password.trim().length > 6
    };
  } 
  if (action.type === 'INPUT_BLUR') {
    return {
      ...state,
    }
   }

  return {
    value: '',
    isValid: false
  }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'EMAIL_CHANGE', email: event.target.value});
  };

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    setFormIsValid(
      emailIsValid && passwordIsValid
    );
   },[emailIsValid, passwordIsValid]);

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'PASSWORD_CHANGE', password: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            !passwordState.isValid && passwordState.isValid !==null ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
