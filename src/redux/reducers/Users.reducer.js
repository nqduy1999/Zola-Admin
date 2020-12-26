const { USERS_TYPE } = require('../constants/Users.contant');

const initialState = {
  users: [],
  user: {},
  message: '',
  messageDelete: '',
  dataErr: null,
  dataErrDelete: null,
  errStatus: null,
  loading: false
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    // USERS LIST
    case USERS_TYPE.FETCH_LIST_REQUEST: {
      return { ...state, errStatus: null, loading: true };
    }
    case USERS_TYPE.FETCH_LIST_SUCCESS: {
      return { ...state, loading: false, users: action.payload };
    }

    //CREATE USER
    case USERS_TYPE.ADD_USER_SUCCESS: {
      const { message } = action.payload;
      return { ...state, message };
    }

    case USERS_TYPE.ADD_USER_FAILURE: {
      const { status, data } = action.payload;
      return { ...state, errStatus: status, dataErr: data };
    }

    //USER DETAIL
    case USERS_TYPE.DETAIL_USER_REQUEST: {
      return { ...state, loading: true, errStatus: null };
    }

    case USERS_TYPE.DETAIL_USER_SUCCESS: {
      return { ...state, loading: false, user: action.payload };
    }

    //UPDATE USER
    case USERS_TYPE.UPDATE_USER_SUCCESS: {
      const { message } = action.payload;
      return { ...state, message: message };
    }

    //DELETE USER
    case USERS_TYPE.DELETE_USER_SUCCESS: {
      const { message } = action.payload;
      return { ...state, messageDelete: message };
    }

    case USERS_TYPE.DELETE_USER_FAILURE: {
      const { status, data } = action.payload;
      return { ...state, errStatus: status, dataErrDelete: data };
    }

    case 'DEFAULT_ACTION': {
      return {
        ...state,
        message: '',
        messageDelete: '',
        dataErr: null,
        dataErrDelete: null,
        loading: false,
        errStatus: null,
        user: {}
      };
    }

    default:
      return state;
  }
};
export default UsersReducer;
