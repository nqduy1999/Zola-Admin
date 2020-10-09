import axios from '../utils/axios';
class AccountService {
  accountSignIn = user => {
    return axios.request({
      method: 'POST',
      url: '/accounts/signin',
      data: user
    });
  };
  getInfoAdmin = value => {
    return axios.request({
      method: 'GET',
      url: `/users/detail?phone=${value}`
    });
  };
  updateInfoAdmin = data => {
    return axios.request({
      method: 'PUT',
      url: `/users/update?id=${JSON.parse(localStorage.getItem('id'))}`,
      data
    });
  };
  changePassword = data => {
    return axios.request({
      method: 'POST',
      url: `accounts/passwords/change`,
      data
    });
  };
}

export default AccountService;
