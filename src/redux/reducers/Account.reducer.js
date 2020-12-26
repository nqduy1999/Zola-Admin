import { CREDENTIAL_TYPE } from '../constants/Account.constant';

const initialState = {
  credentials: '',
  role: '',
  errStatus: false,
  errData: [],
  info: null
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
      const { status, data } = action.payload;
      return { ...state, errData: data, errStatus: status };
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
    case CREDENTIAL_TYPE.GET_INFO_REQUEST: {
      return {
        ...state
      };
    }
    case CREDENTIAL_TYPE.GET_INFO_SUCCESS: {
      return {
        ...state,
        info: action.payload
      };
    }
    case CREDENTIAL_TYPE.GET_INFO_FAILURE: {
      const { error, data } = action.payload;
      return {
        ...state,
        errData: data,
        errStatus: error
      };
    }
    case CREDENTIAL_TYPE.UPDATE_INFO_REQUEST: {
      return {
        ...state
      };
    }
    case CREDENTIAL_TYPE.UPDATE_INFO_SUCCESS: {
      return {
        ...state,
        info: action.payload
      };
    }
    case CREDENTIAL_TYPE.UPDATE_INFO_FAILURE: {
      const { error, data } = action.payload;
      return {
        ...state,
        errData: data,
        errStatus: error
      };
    }
    case CREDENTIAL_TYPE.CHANGE_PASSWORD_REQUEST: {
      return {
        ...state
      };
    }
    case CREDENTIAL_TYPE.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state
      };
    }
    case CREDENTIAL_TYPE.CHANGE_PASSWORD_FAILURE: {
      const { error, data } = action.payload;
      return {
        ...state,
        errData: data,
        errStatus: error
      };
    }
    default:
      return state;
  }
};
export default AccountReducer;
