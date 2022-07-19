import axios from 'axios';
import Config from 'react-native-config';

export const client = axios.create({
  baseURL: Config.API_URL,
  responseType: 'json',
});

client.interceptors.response.use(undefined, (error) => {
  // Update error to include response data here
  return Promise.reject(error);
});
