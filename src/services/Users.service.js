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
      url: '/users',
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
      url: `/users/${id}`,
      data: user
    });
  };
  deleteUser = id => {
    return axios.request({
      method: 'DELETE',
      url: `/users/${id}`
    });
  };
}
export default UsersService;
