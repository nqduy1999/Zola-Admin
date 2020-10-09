import { accountService } from '../../services';
import { CREDENTIAL_TYPE } from '../constants/Account.constant';

export const signInAction = (dataDispatch, loginSuccess) => async dispatch => {
  console.log(dataDispatch);
  dispatch({
    type: CREDENTIAL_TYPE.SIGNIN_REQUEST
  });
  accountService
    .accountSignIn(dataDispatch)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        if (data.role === 'ADMIN') {
          console.log(dataDispatch);
          localStorage.setItem('credential', JSON.stringify(data));
          localStorage.setItem('phone', JSON.stringify(dataDispatch.phone));
          dispatch({
            type: CREDENTIAL_TYPE.SIGNIN_SUCCESS,
            payload: data
          });
        }

        loginSuccess();
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: CREDENTIAL_TYPE.SIGNIN_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const signOutAction = () => ({
  type: CREDENTIAL_TYPE.SIGNOUT_SUCCESS
});
export const getInfoAdmin = value => async dispatch => {
  console.log(value);
  dispatch({
    type: CREDENTIAL_TYPE.GET_INFO_REQUEST
  });
  accountService
    .getInfoAdmin(value)
    .then(res => {
      console.log(res);
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: CREDENTIAL_TYPE.GET_INFO_SUCCESS,
          payload: data
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: CREDENTIAL_TYPE.GET_INFO_FAILURE,
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
export const updateInfoAdmin = value => async dispatch => {
  console.log(value);
  dispatch({
    type: CREDENTIAL_TYPE.UPDATE_INFO_REQUEST
  });
  accountService
    .updateInfoAdmin(value)
    .then(res => {
      const { error } = res.data;
      if (!error) {
        dispatch({
          type: CREDENTIAL_TYPE.UPDATE_INFO_SUCCESS,
          payload: value
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: CREDENTIAL_TYPE.UPDATE_INFO_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};
export const accountChange = values => async dispatch => {
  dispatch({
    type: CREDENTIAL_TYPE.CHANGE_PASSWORD_REQUEST
  });
  return accountService.changePassword(values).then(res => {
    console.log(res);
    const { error, data } = res.data;
    if (error === false) {
      dispatch({
        type: CREDENTIAL_TYPE.CHANGE_PASSWORD_SUCCESS
      });
      return data;
    } else if (error === true) {
      dispatch({
        type: CREDENTIAL_TYPE.CHANGE_PASSWORD_FAILURE
      });
    }
  });
};
