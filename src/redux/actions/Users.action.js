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

export const addUserAction = user => dispatch => {
  dispatch({
    type: USERS_TYPE.ADD_USER_REQUEST
  });

  userService
    .addUser(user)
    .then(res => {
      const { error, message } = res.data;
      if (!error) {
        dispatch({
          type: USERS_TYPE.ADD_USER_SUCCESS,
          payload: message
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: USERS_TYPE.ADD_USER_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const detailUserAction = id => dispatch => {
  dispatch({
    type: USERS_TYPE.DETAIL_USER_REQUEST
  });
  userService
    .detailUser(id)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: USERS_TYPE.DETAIL_USER_SUCCESS,
          payload: data
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: USERS_TYPE.DETAIL_USER_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const updateUserAction = (id, user) => dispatch => {
  dispatch({
    type: USERS_TYPE.UPDATE_USER_REQUEST
  });

  userService
    .updateUser(id, user)
    .then(res => {
      const { error, message } = res.data;
      if (!error) {
        dispatch({
          type: USERS_TYPE.UPDATE_USER_SUCCESS,
          payload: message
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: USERS_TYPE.UPDATE_USER_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const deleteUserAction = id => dispatch => {
  dispatch({
    type: USERS_TYPE.DELETE_USER_REQUEST
  });

  userService
    .deleteUser(id)
    .then(res => {
      const { error, message } = res.data;
      if (!error) {
        dispatch({
          type: USERS_TYPE.DELETE_USER_SUCCESS,
          payload: message
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: USERS_TYPE.DELETE_USER_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const dispatchDefaultAction = () => ({
  type: 'DEFAULT_ACTION'
});
