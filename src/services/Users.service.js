import axios from '../utils/axios';
class UsersService {
  fetchUsers = () => {
    return axios.request({
      method: 'GET',
      url: '/users'
    });
  };
  addUser = user => {
    return axios.request({
      method: 'POST',
      url: '/users/add',
      data: user
    });
  };
}
export default UsersService;
