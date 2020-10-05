import axios from '../utils/axios';
class AccountService {
  accountSignIn = user => {
    return axios.request({
      method: 'POST',
      url: '/accounts/signin',
      data: user
    });
  };
}

export default AccountService;
