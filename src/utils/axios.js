import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://api-chat.ga/api/v0'
});

export const setAuthorization = token => {
  //Khi chạy này 1 lần tất cả token sẽ gắn vào header
  // return (instance.defaults.headers.common.Authorization = `Bearer ${token}`);
  return (instance.defaults.headers.common.Authorization = `x-access-token ${token}`);
};
export default instance;
