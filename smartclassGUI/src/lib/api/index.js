import axios from "axios";
import * as storage from "../storage";

let requireAuth = () => {
  let auth = storage.getFromStorage("authToken");
  api.defaults.headers.common["Authorization"] = `Bearer ${auth}`;
};

let api = axios.create({
  baseURL: process.env.API,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET"
  },
  withCredentials: false
});
export {
  api,
  requireAuth
};
