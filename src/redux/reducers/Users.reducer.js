const { USERS_TYPE } = require('../constants/Users.contant');

const initialState = {
  users: [],
  err: null,
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

    default:
      return state;
  }
};
export default UsersReducer;
