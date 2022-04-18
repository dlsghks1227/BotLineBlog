import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import useInput from '../../hooks/useInput';
import { login, selectLoginStatus } from './../../_slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector(selectLoginStatus);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(()=>{
    if(loginStatus === 'success'){
      navigate(`/`);
    }
  }, [loginStatus])

  const logIn = () => {
    const body = {
      email: email,
      password: CryptoJS.AES.encrypt(password, process.env.REACT_APP_SECRET_KEY).toString(),
    }
    dispatch(login(body));
  }

  return (
    <>
      <label htmlFor='email'>Email :</label>
      <input id='email' value={email} onChange={onChangeEmail} />

      <label htmlFor='password'>Password :</label>
      <input id='password' type='password' value={password} onChange={onChangePassword} />

      <button onClick={logIn}>login</button>
    </>
  )
}

export default Login;