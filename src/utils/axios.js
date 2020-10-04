import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://api-chat.ga/api/v0'
});

instance.interceptors.request.use(
  config => {
    const token = JSON.parse(localStorage.getItem('credential'));
    if (token) {
      config.headers['x-access-token'] = token.accessToken;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  res => res,
  err => {
    return Promise.reject(err);
  }
);
export default instance;
