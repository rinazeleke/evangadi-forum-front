import axios from "axios";
const axiosBase = axios.create({
  // baseURL: "https://evangadiforum-backend-deployement-24.onrender.com",
  // baseURL: "http://localhost:5000",
  baseURL: "https://evangadiforum-backend-jivs.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosBase;
