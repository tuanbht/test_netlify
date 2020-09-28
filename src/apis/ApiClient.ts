import Axios from 'axios';
import { API_URL } from '../constants/ApiPaths';
import DataStorage from '../configurations/DataStorage';

const axiosClient = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = DataStorage.getToken();
  if (token) config.headers['Payment-Token'] = token;
  else window.location.assign('/');
  return config;
});

export default axiosClient;
