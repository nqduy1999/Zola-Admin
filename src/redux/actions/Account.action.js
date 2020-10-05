import { accountService } from '../../services';
import { CREDENTIAL_TYPE } from '../constants/Account.constant';

export const signInAction = (data, loginSuccess) => async dispatch => {
  dispatch({
    type: CREDENTIAL_TYPE.SIGNIN_REQUEST
  });

  accountService
    .accountSignIn(data)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        if (data.role === 'ADMIN') {
          localStorage.setItem('credential', JSON.stringify(data));
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
