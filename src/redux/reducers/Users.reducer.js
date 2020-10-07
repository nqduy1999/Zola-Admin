const { USERS_TYPE } = require('../constants/Users.contant');

const initialState = {
  users: [],
  err: null,
  message: '',
  errAdd: null,
  loading: false
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_TYPE.FETCH_LIST_REQUEST: {
      return { ...state, err: null, loading: true };
    }
    case USERS_TYPE.FETCH_LIST_SUCCESS: {
      return { ...state, loading: false, users: action.payload };
    }

    case USERS_TYPE.ADD_USER_SUCCESS: {
      return { ...state, message: action.payload };
    }

    case USERS_TYPE.ADD_USER_FAILURE: {
      const { error, data } = action.payload;
      return { ...state, err: error, errAdd: data };
    }

    case 'DEFAULT_ACTION': {
      return { ...state, message: '', errAdd: null, loading: false };
    }

    default:
      return state;
  }
};
export default UsersReducer;
