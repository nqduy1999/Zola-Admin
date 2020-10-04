import axios from '../utils/axios';
class UsersService {
  fetchUsers = () => {
    return axios.request({
      method: 'GET',
      url: '/users'
    });
  };
}
export default UsersService;
