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
  detailUser = id => {
    return axios.request({
      method: 'GET',
      url: `/users/detail?id=${id}`
    });
  };
  updateUser = (id, user) => {
    return axios.request({
      method: 'PUT',
      url: `/users/update?id=${id}`,
      data: user
    });
  };
}
export default UsersService;
