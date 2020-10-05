import { CREDENTIAL_TYPE } from '../constants/Account.constant';

const initialState = {
  credentials: '',
  role: '',
  errStatus: false,
  errData: []
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDENTIAL_TYPE.SIGNIN_REQUEST: {
      return { ...state };
    }
    case CREDENTIAL_TYPE.SIGNIN_SUCCESS: {
      const { accessToken, role } = action.payload;
      return {
        ...state,
        credentials: accessToken,
        role: role,
        errStatus: false
      };
    }
    case CREDENTIAL_TYPE.SIGNIN_FAILURE: {
      const { error, data } = action.payload;
      return { ...state, errData: data, errStatus: error };
    }

    case CREDENTIAL_TYPE.SIGNOUT_SUCCESS: {
      return {
        ...state,
        credentials: '',
        role: '',
        errStatus: false,
        errData: []
      };
    }

    default:
      return state;
  }
};
export default AccountReducer;
