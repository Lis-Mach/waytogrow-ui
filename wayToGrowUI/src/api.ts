import axios from "axios";

const adapter = axios.create({
  baseURL: "http://localhost:8080",
  //  headers: {'Authorization': `Bearer ${token}`}
});

export default adapter;