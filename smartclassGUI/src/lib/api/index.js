import axios from "axios";

// let requireAuth = () => {
//   let auth = sessionManager.getAuthToken();
//   api.defaults.headers.common["Authorization"] = `${auth.type} ${auth.token}`;
// };

let api = axios.create({
  baseURL: process.env.API,
  headers: {
    "Content-Type": "application/json"
  }
});
export {
  api
};
