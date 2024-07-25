import axios from 'axios'

const url = process.env.REACT_APP_BACKEND_URL

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: url,
});

export default axiosInstance;
