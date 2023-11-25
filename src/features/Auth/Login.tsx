import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Theme } from '@mui/material/styles';
import { fetchServices } from '../../lib/filipclubApi';
import NotificationContext from '../../components/NotificationBanner/context';
import useAuthContext from './authContext';
import FooterIqviaLogo from '../../assets/footer_ui_logo11.png';
import { setLoginInfo } from '../../lib/util';

const Login = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useAuthContext();

  // const onEnter = async () => {
  //   setLoading(true);
  //   const res = await fetchServices(token);
  //   console.log(res);
  //   if (res.error) {
  //     setLoading(false);
  //     setAlert({
  //       message: res.message,
  //       open: true,
  //       error: true,
  //     });
  //     return;
  //   }
  //   setAccessToken(token);
  //   setTimeout(() => {
  //     setLoading(false);
  //     navigate('/sources');
  //     window.localStorage.setItem('token', btoa(token));
  //     setLoginInfo(res.tenantName, res.tenantId, res.tenantCode);
  //     setAlert({
  //       message: 'Successfully LoggedIn',
  //       open: true,
  //       error: false,
  //     });
  //   }, 200);
  // };

  return <div>Login Page</div>;
};

export default Login;
