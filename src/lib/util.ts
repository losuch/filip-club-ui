import { jwtDecode } from 'jwt-decode';
import { myToken } from '../types/types';

export function setLoginInfo(token: string, email: string) {
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('email', email);
}
export function getLoginInfo() {
  const loginInfo = {
    token: window.localStorage.getItem('token'),
    email: window.localStorage.getItem('email'),
  };
  return loginInfo;
}

export function getToken() {
  return window.localStorage.getItem('token');
}

export function removeLocalInfo() {
  window.localStorage.setItem('token', '');
  window.localStorage.setItem('email', '');
}

export function getRoleFromToken(t: string) {
  const [type, token] = atob(t).split(' ');

  if (token !== undefined) {
    return jwtDecode<myToken>(token).role;
  }

  return '';
}
