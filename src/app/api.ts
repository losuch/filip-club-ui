import axios from 'axios';

// export const baseApiURL =
//   process.env.NODE_ENV === "development"
//     ? "https://dt-kfk-usv-dev2-pl1-en1.test2.devops.dt.solutions.iqvia.com/glb-configs"
//     : "/glb-configs";

export const baseApiURL = 'https://test.filip-club.de';

const api = axios.create({
  // ...(process.env.NODE_ENV === "test" && {
  //   defaults: {
  //   adapter:require("axios/lib/adapters/http")
  // }})
});

axios.defaults.withCredentials = true;

export { api };
