import Axios from 'axios';
import { API_URL } from 'constants/ApiPaths';
import { NOT_FOUND_PATH } from 'constants/RouterPaths';
import { store } from './ReduxStore';

const axiosClient = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = store.getState().Credential.token;
  if (token) config.headers['Payment-Token'] = token;
  else window.location.assign(NOT_FOUND_PATH);
  return config;
});

export default axiosClient;
