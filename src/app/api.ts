import axios from 'axios';

// export const baseApiURL = 'https://test.filip-club.de';
export const baseApiURL = 'http://localhost:8080';

const api = axios.create({
  // ...(process.env.NODE_ENV === "test" && {
  //   defaults: {
  //   adapter:require("axios/lib/adapters/http")
  // }})
});

axios.defaults.withCredentials = true;

export { api };
