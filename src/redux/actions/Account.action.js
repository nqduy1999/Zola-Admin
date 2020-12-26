import { accountService } from '../../services';
import { CREDENTIAL_TYPE } from '../constants/Account.constant';

export const signInAction = (dataDispatch, loginSuccess) => async dispatch => {
  dispatch({
    type: CREDENTIAL_TYPE.SIGNIN_REQUEST
  });
  accountService
    .accountSignIn(dataDispatch)
    .then(res => {
      const { data, status } = res;
      if (status === 200) {
        if (data?.role === 'ADMIN') {
          localStorage.setItem('credential', JSON.stringify(data));
          localStorage.setItem('phone', JSON.stringify(dataDispatch.phone));
          dispatch({
            type: CREDENTIAL_TYPE.SIGNIN_SUCCESS,
            payload: data
          });
        }
      }
      loginSuccess();
    })
    .catch(err => {
      const { data, status } = err?.response;
      dispatch({
        type: CREDENTIAL_TYPE.SIGNIN_FAILURE,
        payload: {
          data,
          status
        }
      });
    });
};

export const signOutAction = () => ({
  type: CREDENTIAL_TYPE.SIGNOUT_SUCCESS
});
