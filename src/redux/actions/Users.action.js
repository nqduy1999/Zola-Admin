import { userService } from '../../services';
import { USERS_TYPE } from '../constants/Users.contant';

export const fetchUsersAction = () => dispatch => {
  dispatch({
    type: USERS_TYPE.FETCH_LIST_REQUEST
  });

  userService
    .fetchUsers()
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: USERS_TYPE.FETCH_LIST_SUCCESS,
          payload: data
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: USERS_TYPE.FETCH_LIST_REQUEST_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};
