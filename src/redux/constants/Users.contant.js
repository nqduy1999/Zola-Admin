import createRequestTypes from './constype';
export const USERS_TYPE = {
  ...createRequestTypes('USERS', 'FETCH_LIST'),
  ...createRequestTypes('USERS', 'ADD_USER')
};
